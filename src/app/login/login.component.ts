import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseFormComponent } from '../helpers/base-form-component';
import { LoginFormControls, LoginFormHelper } from '../helpers/forms/login-form-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit, OnDestroy {

  public controls:LoginFormControls;

  constructor(private formHelper:LoginFormHelper){
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls); 
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public submit():void {
    if(!this.canSubmit())
      return;

    // TODO: Finish the reusable components, use BaseFormComponent or use some kind of interface?
    // -> then create endpoints
    this.startLoad();
    const model = this.formHelper.createModel(this.controls);

    this.unexpectedErrorHappened();
  }
}
