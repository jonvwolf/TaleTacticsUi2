import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface UploadFileFormControls {
  fileControl: FormControl
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

  public createForm(controls:UploadFileFormControls) {
    return new FormGroup({
      fileControl: controls.fileControl
    });
  }
}
