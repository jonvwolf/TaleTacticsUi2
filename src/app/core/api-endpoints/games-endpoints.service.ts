import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ReadGameStateModel } from '../api-models/read-game-state-model';
import { ReadStoryModel } from '../api-models/read-story-model';
import { UpdateGameNotesModel } from '../api-models/update-game-notes-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class GamesEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public get(gameCode:string):Observable<ReadGameStateModel>{
    return this.http.get<ReadGameStateModel>(super.securedBasePath + '/games/' + gameCode, {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public getAll():Observable<ReadGameStateModel[]>{
    return this.http.get<ReadGameStateModel[]>(super.securedBasePath + '/games', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public delete(gameCode:string):Observable<any> {
    return this.http.delete(this.securedBasePath + '/games/' + gameCode).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public putNotes(gameCode:string, model:UpdateGameNotesModel):Observable<any> {
    return this.http.put<any>(this.securedBasePath + '/games/' + gameCode + '/notes', model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );  
  }
}
