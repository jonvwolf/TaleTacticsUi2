import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateStoryModel } from 'src/app/core/api-models/create-story-model';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { UpdateStoryModel } from 'src/app/core/api-models/update-story-model';

export interface CreateStoryFormControls {
  titleControl:FormControl,
  descriptionControl:FormControl
}

export interface UpdateStoryFormControls {
  titleControl:FormControl,
  descriptionControl:FormControl
}

@Injectable({
  providedIn: 'root'
})
export class StoryFormHelperService {

  constructor() { }

  public createControls():CreateStoryFormControls{
      // TODO: match validation requirements
      return {
        titleControl: new FormControl('', [Validators.required, Validators.minLength(1)]),
        descriptionControl: new FormControl('', [Validators.required, Validators.minLength(1)])
      };
  }

  public createForm(controls:CreateStoryFormControls):FormGroup{
      return new FormGroup({
        titleControl: controls.titleControl,
          descriptionControl: controls.descriptionControl
      });
  }

  public createModel(controls:CreateStoryFormControls):CreateStoryModel{
      return {
          title: controls.titleControl.value,
          description: controls.descriptionControl.value
      };
  }

  public createUpdateControls():UpdateStoryFormControls{
      // TODO: match validation requirements
      return {
        titleControl: new FormControl('', [Validators.required, Validators.minLength(1)]),
        descriptionControl: new FormControl('', [Validators.required, Validators.minLength(1)])
      };
  }

  public setUpdateValues(model:ReadStoryModel, controls:UpdateStoryFormControls):void {
    controls.titleControl.setValue(model.title);
    controls.descriptionControl.setValue(model.description);
  }

  public createUpdateForm(controls:UpdateStoryFormControls):FormGroup{
      return new FormGroup({
        titleControl: controls.titleControl,
          descriptionControl: controls.descriptionControl
      });
  }

  public createUpdateModel(controls:UpdateStoryFormControls):UpdateStoryModel{
    return {
        title: controls.titleControl.value,
        description: controls.descriptionControl.value
    };
}
}
