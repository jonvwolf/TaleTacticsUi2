import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { HtConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StoryFormHelperService, UpdateStoryFormControls } from 'src/app/ui-helpers/forms/story-form-helper.service';

@Component({
  selector: 'app-update-story',
  templateUrl: './update-story.component.html',
  styleUrls: ['./update-story.component.scss']
})
export class UpdateStoryComponent extends BaseFormComponent implements OnInit {

  public controls:UpdateStoryFormControls;
  public id:number = 0;

  constructor(private formHelper:StoryFormHelperService, private route:ActivatedRoute,
    private router:Router, private endpoints:StoriesEndpointsService) {
    super();

    this.controls = formHelper.createUpdateControls();
    this.form = formHelper.createUpdateForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const id = this.getNumberParam('id', this.route);
    if(id === null){
      this.router.navigate(HtConstants.pathSecuredHome);
      return;
    }

    this.id = id;
    this.subs.add(this.endpoints.get(this.id).subscribe({
      next: (data) => {
        this.formHelper.setUpdateValues(data, this.controls);
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public override submit(): void {
      
  }
}
