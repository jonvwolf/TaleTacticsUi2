import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../core/user-session.service';
import { BaseFormComponent } from '../ui-helpers/base-form-component';
import { LoginFormControls, LoginFormHelper } from '../ui-helpers/forms/login-form-helper';
import { htConstants } from '../core/ht-constants';
import { LoginEndpointsService } from '../core/api-endpoints/login-endpoints.service';
import { UnauthorizedError } from '../core/api-endpoints/errors/unauthorized-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit, OnDestroy {

  public hasBadLogin:boolean = false;
  public controls:LoginFormControls;

  constructor(private formHelper:LoginFormHelper, private session:UserSessionService,
    private router:Router, private loginEndpoints:LoginEndpointsService){
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls); 
  }

  public override ngOnInit(): void {
    if(this.session.isLoggedIn){
      this.router.navigate(htConstants.pathSecuredHome)
      return;
    }
    super.ngOnInit();
  }

  public override submit():void {
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.hasBadLogin = false;
    this.startLoadAndClearErrors();
    const model = this.formHelper.createModel(this.controls);

    super.subs.add(this.loginEndpoints.post(model).subscribe({
      next: (data) => {
        this.endLoad();
        if(this.session.login(data)){
          this.router.navigate(htConstants.pathSecuredHome);
          return;
        }
        this.unexpectedErrorHappened();
      },
      error: (error) => {
        if(error instanceof UnauthorizedError){
          this.endLoad();
          this.hasBadLogin = true;
          return;
        }
        super.endLoadAndHandleError(error);    
      }
    }));
  }
}
