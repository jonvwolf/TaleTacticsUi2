import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../core/user-session.service';
import { BaseFormComponent } from '../ui-helpers/base-form-component';
import { LoginFormControls, LoginFormHelper } from '../ui-helpers/forms/login-form-helper';
import { HtConstants } from '../core/ht-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit, OnDestroy {

  public controls:LoginFormControls;

  constructor(private formHelper:LoginFormHelper, private session:UserSessionService,
    private router:Router){
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls); 
  }

  ngOnInit(): void {
    if(this.session.isLoggedIn){
      this.router.navigate(HtConstants.pathHome)
      return;
    }
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public submit():void {
    if(!this.canSubmit())
      return;

    this.startLoad();
    const model = this.formHelper.createModel(this.controls);

    this.unexpectedErrorHappened();
  }
}
