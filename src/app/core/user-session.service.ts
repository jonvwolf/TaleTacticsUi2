import { Injectable } from '@angular/core';
import { TokenModel } from './api-models/token-model';
import jwt_decode from 'jwt-decode'
import { User } from './logged-user';
import { htConstants } from './ht-constants';

const defaultUser:User = new User(null);

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  public get isLoggedIn():boolean { return this._user.isValidAndNotExpired; }

  public jwt:string = '';
  private _user:User = defaultUser;

  constructor() {
    this.loadJwtFromStorage();
  }

  private loadJwtFromStorage():void{
    const storedJwt = localStorage.getItem(htConstants.localStorageJwt);
    if(storedJwt === null){
      return;
    }
    if(!this.internalLogin(storedJwt)){
      this.logout();
    }
  }

  public login(model:TokenModel):boolean {
    return this.internalLogin(model.token);
  }

  private internalLogin(token:string):boolean{
    const decoded = jwt_decode(token);

    const user = new User(decoded);
    if(!user.isValidAndNotExpired){
      return false;
    }

    this.jwt = token;
    this._user = user;
    localStorage.setItem(htConstants.localStorageJwt, token);
    return true;
  }

  public logout():void {
    this.jwt = '';
    localStorage.removeItem(htConstants.localStorageJwt);
    this._user = defaultUser;
  }

  // Call isLoggedInFirst
  public tryGetUser():User {
    if(!this._user.isValidAndNotExpired){
      throw new Error('Do not get user if not logged in');
    }
    return this._user;
  }
}
