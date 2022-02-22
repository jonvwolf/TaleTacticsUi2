import { Component, OnInit } from '@angular/core';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements, SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormComponent implements OnInit {

  public storyList:ReadStoryModel[] = [];

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Home'
  }; }

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

      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

}
