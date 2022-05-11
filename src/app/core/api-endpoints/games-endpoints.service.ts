import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ReadStoryModel } from '../api-models/read-story-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class GamesEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public get(gameCode:string):Observable<ReadStoryModel>{
    return this.http.get<ReadStoryModel>(super.basePath + '/games/' + gameCode + '/configuration', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }
}
