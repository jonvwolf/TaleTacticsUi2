import { Component, OnInit } from '@angular/core';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormComponent implements OnInit {

  public storyList:ReadStoryModel[] = [];

  constructor(private stories:StoriesEndpointsService) {
    super();

    // TODO:
  //     Maybe make BaseFormComponent a variable like: HtForm which has all the variables, etc
  //   -> Change it. I have submit() in Secured Home

  // how to change parent view (nav bar title)
  //   -> onActivate
  //   https://stackoverflow.com/questions/45587507/angular-how-to-get-component-instance-of-router-outlet
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

  public submit():void{
    // TODO: this should not be like this
  }
}
