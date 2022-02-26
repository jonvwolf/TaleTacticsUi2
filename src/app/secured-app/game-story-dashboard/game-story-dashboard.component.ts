import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements, SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-game-story-dashboard',
  templateUrl: './game-story-dashboard.component.html',
  styleUrls: ['./game-story-dashboard.component.scss']
})
export class GameStoryDashboardComponent extends BaseFormComponent implements OnInit {

  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Game dashboard'
  }; }

  constructor(private ui:SecuredAppUiService) {
    super();
  }

  override ngOnInit(): void {
    
  }

}
