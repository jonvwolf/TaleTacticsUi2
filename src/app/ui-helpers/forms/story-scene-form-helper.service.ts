import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateStorySceneModel } from 'src/app/core/api-models/create-story-scene-model';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { UpdateStorySceneModel } from 'src/app/core/api-models/update-story-scene-model';

export interface CreateStorySceneFormControls {
  titleControl:FormControl
}

export interface UpdateStorySceneFormControls {
  titleControl:FormControl
}

@Injectable({
  providedIn: 'root'
})
export class StorySceneFormHelperService {

  constructor() { }

  public createControls():CreateStorySceneFormControls{
      // TODO: match validation requirements
      return {
        titleControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      };
  }

  public createForm(controls:CreateStorySceneFormControls):FormGroup{
      return new FormGroup({
        titleControl: controls.titleControl
      });
  }

  public createModel(controls:CreateStorySceneFormControls):CreateStorySceneModel{
      return {
          title: controls.titleControl.value
      };
  }

  public createUpdateControls():UpdateStorySceneFormControls{
      // TODO: match validation requirements
      return {
        titleControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)])
      };
  }

  public setUpdateValues(model:ReadStorySceneModel, controls:UpdateStorySceneFormControls):void {
    controls.titleControl.setValue(model.title);
  }

  public createUpdateForm(controls:UpdateStorySceneFormControls):FormGroup{
      return new FormGroup({
        titleControl: controls.titleControl
      });
  }

  public createUpdateModel(controls:UpdateStorySceneFormControls):UpdateStorySceneModel{
    return {
        title: controls.titleControl.value
    };
  }
}
