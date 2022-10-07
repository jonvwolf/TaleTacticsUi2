import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReadGameStateModel } from 'src/app/core/api-models/read-game-state-model';
import { UpdateGameNotesModel } from 'src/app/core/api-models/update-game-notes-model';

export interface UpdateGameNotesFormControls {
  notesControl:FormControl
}

@Injectable({
  providedIn: 'root'
})
export class GameFormHelperService {

  constructor() { }

  public setUpdateValues(model:ReadGameStateModel, controls:UpdateGameNotesFormControls):void {
    controls.notesControl.setValue(model.notes);
  }

  public createControls():UpdateGameNotesFormControls{
    // TODO: match validation requirements
    return {
      notesControl: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    };
  }

  public createForm(controls:UpdateGameNotesFormControls):FormGroup{
      return new FormGroup({
        notesControl: controls.notesControl
      });
  }

  public createModel(controls:UpdateGameNotesFormControls):UpdateGameNotesModel{
      return {
          notes: controls.notesControl.value
      };
  }
}
