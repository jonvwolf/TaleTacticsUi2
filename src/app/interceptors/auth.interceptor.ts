import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from '../core/user-session.service';
import { htConstants } from '../core/ht-constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session:UserSessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.session.isLoggedIn){
      
      if(request.url.indexOf(environment.apiHost + htConstants.securedBasePath + '/') > -1){
        const cloned = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + this.session.jwt)
        });
        return next.handle(cloned);
      }
    }

    return next.handle(request);
  }
}
