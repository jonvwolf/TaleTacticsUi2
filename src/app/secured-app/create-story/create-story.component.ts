import { Component, OnInit } from '@angular/core';
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

  constructor(private formHelper:StoryFormHelperService) {
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls);
  }

  override ngOnInit(): void {
    this.unexpectedErrorHappened();
    super.ngOnInit();
  }

}
