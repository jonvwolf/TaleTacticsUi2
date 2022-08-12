import { HttpErrorResponse } from "@angular/common/http";

export interface ServerErrorModel {
    title:string,
    detail:string
}

export const checkIfErrorServerModel = (obj:any): obj is ServerErrorModel => {
    return obj && 'title' in obj && 'detail' in obj;
};

export class InternalServerError {
    
    private _errorMessage:string;
    public get errorMessage():string { return this._errorMessage; };

    public constructor(error:HttpErrorResponse){
        this._errorMessage = '';

        if(checkIfErrorServerModel(error.error)){
            this._errorMessage += error.error.detail;
        }else{
            this._errorMessage = error.message;
        }
    }
}
