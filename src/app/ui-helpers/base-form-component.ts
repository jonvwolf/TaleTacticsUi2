import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { htCreateSubmitBtnOptions } from "./reusable-components/submit-btn/submit-btn.component";

export interface IFormComponent {
    hasUnexpectedError:boolean,
    hasBadRequestFromServer:boolean,
    isLoading:boolean,
    isSubmitBtnDisabled:boolean
    submit():void
}

const baseFormComponentDefaultFormGroup = new FormGroup({});

export abstract class BaseFormComponent implements IFormComponent {
    public form:FormGroup = baseFormComponentDefaultFormGroup;

    private _hasUnexpectedError:boolean = false;
    private _hasBadRequestFromServer:boolean = false;
    private _isLoading:boolean = false;

    public get hasUnexpectedError():boolean { return this._hasUnexpectedError }
    public get hasBadRequestFromServer():boolean { return this._hasBadRequestFromServer }
    public get isLoading():boolean { return this._isLoading; }
    public get isSubmitBtnDisabled():boolean{ return this.form.invalid; }
    
    public createSubmitBtnOptions = htCreateSubmitBtnOptions; 

    protected subs:Subscription = new Subscription();

    protected onDestroy():void{
        this.subs.unsubscribe();
    }

    protected startLoad():void{
        this._isLoading = true;
        this.form.disable();
    }

    protected endLoad():void{
        this._isLoading = false;
        this.form.enable();
    }

    public abstract submit(): void;

    protected canSubmit():boolean{
        return !(this.form.invalid);
    }

    public hasError(control:FormControl):boolean{
        return control.invalid && (control.dirty || control.touched);
    }

    public unexpectedErrorHappened():void{
        this._hasUnexpectedError = true;
    }

    public test():void{
        this._hasUnexpectedError = true;
        this._isLoading = true;
    }
}
