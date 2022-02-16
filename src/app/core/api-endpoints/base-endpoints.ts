import { HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HtConstants } from "../ht-constants";
import { BadRequestError } from "./errors/bad-request-error";
import { InternalServerError } from "./errors/internal-server-error";
import { NotFoundError } from "./errors/not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

export abstract class BaseApiEndpoints {
    protected get basePath():string { return environment.apiHost; }
    protected get securedBasePath():string { return environment.apiHost + HtConstants.securedBasePath; }

    protected createHttpHeadersJson():HttpHeaders{
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return headers;
    }

    protected createHttpParams(obj:any):HttpParams{
        let params = new HttpParams();
        for(const key of Object.keys(obj)){
            if(obj[key] !== null && obj[key] !== undefined){
                params = params.set(key, obj[key]);
            }
        }
        return params;
    }

    protected handleHttpError(err:HttpErrorResponse):Observable<never>{
        const func2 = this.processHttpError;
        return throwError(() => func2(err));
    }

    protected processHttpError(err:HttpErrorResponse):any{
        if(err.status === 0){
            // client side error
            console.error('Client error. Trying to call server', err);
            return err;
          }else{
            // backend error
            if(err.status === 401){
              // return that the login was incorrect
              // TODO: pass err.message?
              return new UnauthorizedError();
            }
            if(err.status === 400){
                // TODO: pass err.error.errors
                return new BadRequestError();
            }
            if(err.status === 404){
                return new NotFoundError();
            }

            console.warn('Server returned 500', err);
            // TODO: pass err
            return new InternalServerError();
          }
    }
}
