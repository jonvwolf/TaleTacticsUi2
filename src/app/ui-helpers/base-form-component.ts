import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { BadRequestError } from "../core/api-endpoints/errors/bad-request-error";
import { UnauthorizedError } from "../core/api-endpoints/errors/unauthorized-error";
import { htConstants, HtConstants } from "../core/ht-constants";
import { htCreateSubmitBtnOptions } from "./reusable-components/submit-btn/submit-btn.component";
import { SecuredAppUiGeneralElements } from "./secured-app-ui.service";

export interface IFormComponent {
    hasUnexpectedError:boolean,
    hasBadRequestFromServerError:boolean,
    hasSessionExpiredError:boolean,
    isLoading:boolean,
    isSubmitBtnDisabled:boolean,
    customErrorText:string|null,
    customSuccessText:string|null
    submit():void
}

const baseFormComponentDefaultFormGroup = new FormGroup({});

@Component({
    template: ''
})
export abstract class BaseFormComponent implements IFormComponent, OnDestroy, OnInit {
    public ht:HtConstants = htConstants;
    public form:FormGroup = baseFormComponentDefaultFormGroup;

    // TODO: all of the form variables can be inside a reusable class (so you can have more than 2 forms and separate responsibilities)
    private _hasUnexpectedError:boolean = false;
    private _hasBadRequestFromServer:boolean = false;
    private _hasSessionExpiredError:boolean = false;
    private _customErrorText:string|null = null;
    private _customSuccessText:string|null = null;
    private _isLoading:boolean = false;
    
    public get hasUnexpectedError():boolean { return this._hasUnexpectedError; }
    public get hasBadRequestFromServerError():boolean { return this._hasBadRequestFromServer; }
    public get hasSessionExpiredError():boolean { return this._hasSessionExpiredError; }
    public get customErrorText():string|null { return this._customErrorText; }
    public set customErrorText(val:string|null) { this._customErrorText = val; }
    public get customSuccessText():string|null { return this._customSuccessText; }
    public set customSuccessText(val:string|null) { this._customSuccessText = val; }

    public get isLoading():boolean { return this._isLoading; }
    public get isSubmitBtnDisabled():boolean{ return this.form.invalid; }
    
    public get createSubmitBtnOptions() { return htCreateSubmitBtnOptions; } 

    public get initialGeneralElements():SecuredAppUiGeneralElements { return {}; }

    private _subs:Subscription = new Subscription();
    protected get subs():Subscription { return this._subs; }

    public submit(): void{
        // nothing
    }

    public ngOnInit(): void {
        this.form.reset();
    }
    
    public ngOnDestroy():void{
        // This is called even if the child does not have implements OnDestroy
        this._subs.unsubscribe();
    }

    protected startLoadAndClearErrors():void{
        this._isLoading = true;
        this._hasBadRequestFromServer = false;
        this._hasBadRequestFromServer = false;
        this._hasSessionExpiredError = false;
        this._customErrorText = null;
        this._customSuccessText = null;
        
        this.form.disable();
    }

    protected endLoad():void{
        this._isLoading = false;
        this.form.enable();
    }

    protected canSubmitAndTouchForm():boolean{
        if(this.form.invalid){
            this.form.markAllAsTouched();
            return false;
        }
        return true;
    }

    public controlHasError(control:FormControl):boolean{
        return control.invalid && (control.dirty || control.touched);
    }

    public unexpectedErrorHappened():void{
        this._hasUnexpectedError = true;
    }

    protected endLoadAndHandleError(error:any){
        this.endLoad();
        if(error instanceof BadRequestError){
            this._hasBadRequestFromServer = true;
        }else if(error instanceof UnauthorizedError){
            this._hasSessionExpiredError = true;
        }else{
            this.unexpectedErrorHappened();
        }
    }

    protected getNumberParam(key:string, route:ActivatedRoute):number|null{
        const val = Number(route.snapshot.paramMap.get(key));
        return Number.isNaN(val) ? null : val;
    }
    protected getStringParam(key:string, route:ActivatedRoute):string|null{
        return route.snapshot.paramMap.get(key);
    }
}
