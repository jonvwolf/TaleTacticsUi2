import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateStorySceneCommandModel } from '../api-models/create-story-scene-command-model';
import { ReadStorySceneCommandModel } from '../api-models/read-story-scene-command-model';
import { UpdateStorySceneCommandModel } from '../api-models/update-story-scene-command-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CommandsEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public getAll(sceneId:number):Observable<ReadStorySceneCommandModel[]>{
    return this.http.get<ReadStorySceneCommandModel[]>(this.securedBasePath + '/scenes' + sceneId + '/commands', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public get(id:number):Observable<ReadStorySceneCommandModel>{
    return this.http.get<ReadStorySceneCommandModel>(this.securedBasePath + '/scenes/commands/' + id, {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.securedBasePath + '/scenes/commands/' + id).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public post(sceneId:number, model:CreateStorySceneCommandModel):Observable<ReadStorySceneCommandModel>{
    return this.http.post<ReadStorySceneCommandModel>(this.securedBasePath + '/scenes/' + sceneId + '/commands', model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public put(id:number, model:CreateStorySceneCommandModel):Observable<ReadStorySceneCommandModel>{
    return this.http.put<ReadStorySceneCommandModel>(this.securedBasePath + '/scenes/commands/' + id, model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }
}
