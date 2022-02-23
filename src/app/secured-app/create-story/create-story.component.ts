import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { HtConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { CreateStoryFormControls, StoryFormHelperService } from 'src/app/ui-helpers/forms/story-form-helper.service';
import { SecuredAppUiGeneralElements } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent extends BaseFormComponent implements OnInit {

  public controls:CreateStoryFormControls;
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Create a story'
  }; }

  constructor(private formHelper:StoryFormHelperService, private endpoints:StoriesEndpointsService,
    private router:Router) {
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  public override submit(): void {
      if(!this.canSubmitAndTouchForm()){
        return;
      }

      this.startLoadAndClearErrors();
      const model = this.formHelper.createModel(this.controls);

      this.subs.add(this.endpoints.post(model).subscribe({
        next: () => {
          this.router.navigate(HtConstants.pathSecuredHome);
          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
  }
}
