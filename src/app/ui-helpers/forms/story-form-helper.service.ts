import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateStoryModel } from 'src/app/core/api-models/create-story-model';

export interface CreateStoryFormControls {
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
    // TODO:
    return {
        
    };
}
}
