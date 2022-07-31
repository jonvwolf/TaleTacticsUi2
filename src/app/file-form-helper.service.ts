import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateAudioModel } from './core/api-models/update-audio-model';
import { UpdateImageModel } from './core/api-models/update-image-model';

export interface UploadFileFormControls {
  fileControl: FormControl
}

export interface UpdateFileFormControls {
  nameControl:FormControl;
}

@Injectable({
  providedIn: 'root'
})
export class FileFormHelperService {

  constructor() { }

  public createUploadControls():UploadFileFormControls {
    return {
      fileControl: new FormControl('')
    }
  }

  public createUpdateContols():UpdateFileFormControls {
    return {
      nameControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(300)])
    };
  }

  public createForm(controls:UploadFileFormControls) : FormGroup {
    // TODO: upload form is not used like it should be
    return new FormGroup({
      fileControl: controls.fileControl
    });
  }

  public createUpdateForm(controls:UpdateFileFormControls) : FormGroup {
    return new FormGroup({
      nameControl: controls.nameControl
    });
  }

  public createUpdateAudioModel(controls:UpdateFileFormControls) : UpdateAudioModel {
    return {
      name: controls.nameControl.value
    };
  }

  public createUpdateImageModel(controls:UpdateFileFormControls) : UpdateImageModel {
    return {
      name: controls.nameControl.value
    };
  }
}
