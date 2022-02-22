import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay, Subscription, tap } from 'rxjs';
import { HtConstants } from '../core/ht-constants';
import { UserSessionService } from '../core/user-session.service';
import { htDefaultGeneralElements, SecuredAppUiGeneralElements, SecuredAppUiService } from '../ui-helpers/secured-app-ui.service';
import { BaseFormComponent } from '../ui-helpers/base-form-component'

@Component({
  selector: 'app-secured-app',
  templateUrl: './secured-app.component.html',
  styleUrls: ['./secured-app.component.scss']
})
export class SecureAppComponent implements OnInit {

  public generalElements:SecuredAppUiGeneralElements = htDefaultGeneralElements;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  private subs:Subscription = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver, private appUI:SecuredAppUiService,
    private session:UserSessionService, private router:Router) { 

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // TODO: I think Observe is better?
    this.subs.add(this.appUI.generalElementsEvent.subscribe(options => {
      this.generalElements = options;
    }));    
  }

  public logout():void {
    this.session.logout();
    this.router.navigate(HtConstants.pathLogin);
  }

  public onRuterActive(event:any):void{
    if(event instanceof BaseFormComponent){
      this.appUI.changeGeneralElements(event.initialGeneralElements);
    }
  }
}
