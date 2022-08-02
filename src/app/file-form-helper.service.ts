import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReadAudioModel } from './core/api-models/read-audio-model';
import { ReadImageModel } from './core/api-models/read-image-model';
import { UpdateAudioModel } from './core/api-models/update-audio-model';
import { UpdateImageModel } from './core/api-models/update-image-model';

export interface UploadFileFormControls {
  fileControl: FormControl
}

export interface UpdateFileFormControls {
  nameControl:FormControl,
  isBgm:FormControl|null
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

  public createUpdateAudioContols():UpdateFileFormControls {
    return {
      nameControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]),
      isBgm: new FormControl()
    };
  }

  public createUpdateImageContols():UpdateFileFormControls {
    return {
      nameControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]),
      isBgm: null
    };
  }

  public setUpdateAudioValues(audio:ReadAudioModel, controls:UpdateFileFormControls):void{
    controls.nameControl.setValue(audio.name);
    controls.isBgm?.setValue(audio.isBgm);
  }

  public setUpdateImageValues(image:ReadImageModel, controls:UpdateFileFormControls):void{
    controls.nameControl.setValue(image.name);
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
      name: controls.nameControl.value,
      isBgm: controls.isBgm?.value
    };
  }

  public createUpdateImageModel(controls:UpdateFileFormControls) : UpdateImageModel {
    return {
      name: controls.nameControl.value
    };
  }
}
