import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateStorySceneModel } from '../api-models/create-story-scene-model';
import { ReadStorySceneModel } from '../api-models/read-story-scene-model';
import { UpdateStorySceneModel } from '../api-models/update-story-scene-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StoryScenesEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public getAll(sceneId:number):Observable<ReadStorySceneModel[]>{
    return this.http.get<ReadStorySceneModel[]>(this.securedBasePath + '/stories' + sceneId + '/scenes', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public get(id:number):Observable<ReadStorySceneModel>{
    return this.http.get<ReadStorySceneModel>(this.securedBasePath + '/stories/scenes/' + id, {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public post(sceneId:number, model:CreateStorySceneModel):Observable<ReadStorySceneModel>{
    return this.http.post<ReadStorySceneModel>(this.securedBasePath + '/stories/' + sceneId + '/scenes', model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public put(id:number, model:UpdateStorySceneModel):Observable<ReadStorySceneModel>{
    return this.http.put<ReadStorySceneModel>(this.securedBasePath + '/stories/scenes/' + id, model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

}
