import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { LoginModel } from '../api-models/login-model';
import { TokenModel } from '../api-models/token-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public post(model:LoginModel):Observable<TokenModel>{
    return this.http.post<TokenModel>(super.basePath + '/login', model, {headers: super.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return super.handleHttpError(err);
      })
    );
  }
}
