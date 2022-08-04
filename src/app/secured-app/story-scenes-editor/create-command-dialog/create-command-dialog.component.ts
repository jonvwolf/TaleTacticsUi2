import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';

@Component({
  selector: 'app-create-command-dialog',
  templateUrl: './create-command-dialog.component.html',
  styleUrls: ['./create-command-dialog.component.scss']
})
export class CreateCommandDialogComponent extends BaseFormComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<CreateCommandDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ReadStorySceneModel) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  public close():void{
    this.dialogRef.close();
  }

  public override submit():void {
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.startLoadAndClearErrors();
  }
}
