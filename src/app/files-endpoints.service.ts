import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseApiEndpoints } from './core/api-endpoints/base-endpoints';
import { ReadAudioModel } from './core/api-models/read-audio-model';
import { ReadImageModel } from './core/api-models/read-image-model';
import { UpdateAudioModel } from './core/api-models/update-audio-model';
import { UpdateImageModel } from './core/api-models/update-image-model';

@Injectable({
  providedIn: 'root'
})
export class FilesEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public getAllAudios():Observable<ReadAudioModel[]>{
    return this.http.get<ReadAudioModel[]>(this.securedBasePath + '/audios', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public getAllImages():Observable<ReadImageModel[]>{
    return this.http.get<ReadImageModel[]>(this.securedBasePath + '/images', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public postAudio(file:File):Observable<ReadAudioModel>{
    const form = new FormData();
    form.append('file', file);

    return this.http.post<ReadAudioModel>(this.securedBasePath + '/audios', form).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public postImage(file:File):Observable<ReadImageModel>{
    const form = new FormData();
    form.append('file', file);

    return this.http.post<ReadImageModel>(this.securedBasePath + '/images', form).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public putAudio(id:number, model:UpdateAudioModel):Observable<ReadAudioModel>{
    return this.http.put<ReadAudioModel>(this.securedBasePath + '/audios/' + id, model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public putImage(id:number, model:UpdateImageModel):Observable<ReadImageModel>{
    return this.http.put<ReadImageModel>(this.securedBasePath + '/images/' + id, model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public deleteImage(id:number):Observable<any> {
    return this.http.delete(this.securedBasePath + '/images/' + id).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public deleteAudio(id:number):Observable<any> {
    return this.http.delete(this.securedBasePath + '/audios/' + id).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }
}
