import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { createSubmitBtnOptions as htCreateSubmitBtnOptions } from "./reusable-components/submit-btn/submit-btn.component";

const baseFormComponentDefaultFormGroup = new FormGroup({});

export abstract class BaseFormComponent {
    public form:FormGroup = baseFormComponentDefaultFormGroup;

    private _hasUnexpectedError:boolean = false;
    private _hasBadRequestFromServer:boolean = false;
    private _isLoading:boolean = false;

    public get hasUnexpectedError():boolean { return this._hasUnexpectedError }
    public get hasBadRequestFromServer():boolean { return this._hasBadRequestFromServer }
    public get isLoading():boolean { return this._isLoading; }

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

    protected canSubmit():boolean{
        return !(this.form.invalid);
    }

    public isSubmitBtnDisabled():boolean{
        return this.form.invalid;
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
