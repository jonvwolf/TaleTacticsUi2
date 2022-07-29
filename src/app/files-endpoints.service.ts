import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseApiEndpoints } from './core/api-endpoints/base-endpoints';
import { ReadAudioModel } from './core/api-models/read-audio-model';
import { ReadImageModel } from './core/api-models/read-image-model';

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
}
