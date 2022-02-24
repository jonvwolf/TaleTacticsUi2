import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { htConstants } from 'src/app/core/ht-constants';
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

    this.startLoadAndClearErrors();
    const id = this.getNumberParam(htConstants.updateStoryIdParamName, this.route);
    if(id === null){
      this.router.navigate(htConstants.pathSecuredHome);
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
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.startLoadAndClearErrors();
    const model = this.formHelper.createUpdateModel(this.controls);

    this.subs.add(this.endpoints.put(this.id, model).subscribe({
      next: (data) => {
        // TODO: nagivate with sucess param
        this.router.navigate(htConstants.pathSecuredHome);
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }
}
