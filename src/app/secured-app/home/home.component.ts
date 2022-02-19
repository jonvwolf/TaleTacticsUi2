import { Component, OnInit } from '@angular/core';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormComponent implements OnInit {

  public storyList:ReadStoryModel[] = [];

  constructor(private stories:StoriesEndpointsService, private appUI:SecuredAppUiService) {
    super();

  }
  
  override ngOnInit(): void {
    super.ngOnInit();

    this.startLoadAndClearErrors();
    this.storyList = [];
    this.subs.add(this.stories.getAll().subscribe({
      next: (data) => {
        this.storyList = data;
        this.endLoad();

        // TODO: add onActivate to get the generalElements and this one
        // can be used to change things at a later point
        this.appUI.changeGeneralElements({
          headerTitle: 'Home' + Date()
        });
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

}
