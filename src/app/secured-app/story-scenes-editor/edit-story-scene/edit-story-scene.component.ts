import { Component, Input, OnInit } from '@angular/core';
import { StoryScenesEndpointsService } from 'src/app/core/api-endpoints/story-scenes-endpoints.service';
import { defaultReadStorySceneModel, ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StorySceneFormHelperService, UpdateStorySceneFormControls } from 'src/app/ui-helpers/forms/story-scene-form-helper.service';

@Component({
  selector: 'app-edit-story-scene',
  templateUrl: './edit-story-scene.component.html',
  styleUrls: ['./edit-story-scene.component.scss']
})
export class EditStorySceneComponent extends BaseFormComponent implements OnInit {

  public controls:UpdateStorySceneFormControls;

  @Input() model:ReadStorySceneModel = defaultReadStorySceneModel;

  constructor(private formHelper:StorySceneFormHelperService, private endpoints:StoryScenesEndpointsService) {
    super();

    this.controls = formHelper.createUpdateControls();
    this.form = formHelper.createUpdateForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.formHelper.setUpdateValues(this.model, this.controls);
  }

  public override submit():void {

  }
}
