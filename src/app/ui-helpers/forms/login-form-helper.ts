import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginModel } from "src/app/core/api-models/login-model";

export interface LoginFormControls {
    usernameControl:FormControl,
    passwordControl:FormControl
}

@Injectable({
    providedIn: 'root'
})
export class LoginFormHelper {

    public createControls():LoginFormControls{
        return {
            usernameControl: new FormControl('', [Validators.required]),
            passwordControl: new FormControl('', [Validators.required, Validators.minLength(1)])
        };
    }

    public createForm(controls:LoginFormControls):FormGroup{
        return new FormGroup({
            usernameControl: controls.usernameControl,
            passwordControl: controls.passwordControl
        });
    }

    public createModel(controls:LoginFormControls):LoginModel{
        return {
            username: controls.usernameControl.value,
            password: controls.passwordControl.value
        };
    }
}
