import { Injectable } from '@angular/core';
import { TokenModel } from './models/token-model';
import jwt_decode from 'jwt-decode'
import { User } from './user';
import { HtConstants } from './ht-constants';

const defaultUser:User = new User(null);

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  public get isLoggedIn():boolean { return this._user.isValidAndNotExpired; }

  private _user:User = defaultUser;

  constructor() {
    this.loadJwtFromStorage();
  }

  private loadJwtFromStorage():void{
    const storedJwt = localStorage.getItem(HtConstants.localStorageJwt);
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

    this._user = user;
    localStorage.setItem(HtConstants.localStorageJwt, token);
    return true;
  }

  public logout():void {
    localStorage.removeItem(HtConstants.localStorageJwt);
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
