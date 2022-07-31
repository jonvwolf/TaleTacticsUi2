import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileFormHelperService, UpdateFileFormControls } from 'src/app/file-form-helper.service';
import { FilesEndpointsService } from 'src/app/files-endpoints.service';
import { IFileItem } from 'src/app/files-manager/files-manager.component';
import { BaseFormComponent } from '../../base-form-component';

const successMessage = 'File was updated successfully';

@Component({
  selector: 'app-edit-file-dialog',
  templateUrl: './edit-file-dialog.component.html',
  styleUrls: ['./edit-file-dialog.component.scss']
})
export class EditFileDialogComponent extends BaseFormComponent implements OnInit {

  public controls:UpdateFileFormControls;
  public absoluteUrl:string|null = null;

  constructor(public dialogRef:MatDialogRef<EditFileDialogComponent>,
    private endpoints:FilesEndpointsService,
    private formHelper:FileFormHelperService,
    @Inject(MAT_DIALOG_DATA) public data: IFileItem) {
    super();

    this.controls = formHelper.createUpdateContols();
    this.form = formHelper.createUpdateForm(this.controls);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.controls.nameControl.setValue(this.data.name);

    if(this.data.audioModel !== null){
      this.absoluteUrl = this.data.audioModel.absoluteUrl;
    }else if(this.data.imageModel !== null){
      this.absoluteUrl = this.data.imageModel.absoluteUrl;
    }
  }

  public close():void {
    this.dialogRef.close();
  }

  public delete():void {
    if(confirm('This will permanently delete the file. Are you sure?')){

      this.startLoadAndClearErrors();
      if(this.data.audioModel !== null){
        this.subs.add(this.endpoints.deleteAudio(this.data.id).subscribe({
          next: (data) => {
            this.customSuccessText = 'File successfully deleted. You may not close the dialog';
            this.endLoad();
          },
          error: (err) => {
            this.endLoadAndHandleError(err);
          }
        }));
      }else{
        this.subs.add(this.endpoints.deleteImage(this.data.id).subscribe({
          next: (data) => {
            this.customSuccessText = 'File successfully deleted. You may not close the dialog';
            this.endLoad();
          },
          error: (err) => {
            this.endLoadAndHandleError(err);
          }
        }));
      }
    }
  }

  public override submit():void{
    this.customSuccessText = null;
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.startLoadAndClearErrors();

    if(this.data.audioModel !== null){
      const model = this.formHelper.createUpdateAudioModel(this.controls);

      this.subs.add(this.endpoints.putAudio(this.data.id, model).subscribe({
        next: (data) => {
          this.endLoad();
          this.customSuccessText = successMessage;
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }else{
      const model = this.formHelper.createUpdateImageModel(this.controls);

      this.subs.add(this.endpoints.putImage(this.data.id, model).subscribe({
        next: (data) => {
          this.endLoad();
          this.customSuccessText = successMessage;
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
  }
}
