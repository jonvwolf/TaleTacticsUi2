import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { htConstants } from 'src/app/core/ht-constants';
import { FileFormHelperService, UpdateFileFormControls } from 'src/app/file-form-helper.service';
import { FilesEndpointsService } from 'src/app/files-endpoints.service';
import { FilesManagerComponent, IFileItem } from 'src/app/files-manager/files-manager.component';
import { BaseFormComponent } from '../../base-form-component';

const successMessage = 'File was updated successfully';

// TODO: repeated code
const invalidFileTypeMessage = 'Invalid file. Select only jpeg, png or mp3';
const invalidFileSizeMessage = 'Maximum file size of 2 megabytes allowed';
const invalidImageFile = 'Invalid file. Must select an image';
const invalidAudioFile = 'Invalid file. Must select an audio';

@Component({
  selector: 'app-edit-file-dialog',
  templateUrl: './edit-file-dialog.component.html',
  styleUrls: ['./edit-file-dialog.component.scss']
})
export class EditFileDialogComponent extends BaseFormComponent implements OnInit {

  public controls:UpdateFileFormControls;
  public absoluteImageUrl:string|null = null;
  public absoluteAudioUrl:string|null = null;

  public selectedFile:File|null = null;

  @ViewChild('fileInput') fileInput: ElementRef|null = null;

  constructor(public dialogRef:MatDialogRef<EditFileDialogComponent>,
    private endpoints:FilesEndpointsService,
    private formHelper:FileFormHelperService,
    @Inject(MAT_DIALOG_DATA) public data: IFileItem) {
    super();

    if(data.audioModel !== null){
      this.controls = this.formHelper.createUpdateAudioContols();
    }else{
      this.controls = this.formHelper.createUpdateImageContols();
    }
    
    this.form = this.formHelper.createUpdateForm(this.controls);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.reloadData();
  }

  private reloadData():void{
    if(this.data.audioModel !== null){

      this.formHelper.setUpdateAudioValues(this.data.audioModel, this.controls);
      this.absoluteImageUrl = null;
      this.absoluteAudioUrl = this.data.audioModel.absoluteUrl;
    }else if(this.data.imageModel !== null){
      this.formHelper.setUpdateImageValues(this.data.imageModel, this.controls);
      this.absoluteImageUrl = this.data.imageModel.absoluteUrl;
      this.absoluteAudioUrl = null;
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

  public submitFile():void {
    this.clearMessages();

    // TODO: file validation is repeated code
    if(this.selectedFile === null){
      // TODO: change this to a form validator
      this.customErrorText = invalidFileTypeMessage;
      return;
    }

    const extension = this.selectedFile.name.split('.').pop();
    if(!htConstants.allowedFileExtensions.includes(extension ?? 'invalid')){
      // TODO: change this to a form validator
      this.customErrorText = invalidFileTypeMessage;
      return;
    }

    if(this.selectedFile.size > htConstants.allowedMaxFileSizeInKb * 1024){
      // TODO: change this to a form validator
      this.customErrorText = invalidFileSizeMessage;
      return;
    }

    if(this.selectedFile.type.startsWith("image/") && this.data.audioModel !== null){
      this.customErrorText = invalidAudioFile;
      return;
    }else if(this.selectedFile.type.startsWith("audio/") && this.data.imageModel !== null){
      this.customErrorText = invalidImageFile;
      return;
    }

    this.startLoadAndClearErrors();

    if(this.selectedFile.type.startsWith("image/")){
      this.subs.add(this.endpoints.putImageFile(this.data.id, this.selectedFile).subscribe({
        next: (data) => {
          this.customSuccessText = 'The file was replaced successfully';
          this.data = FilesManagerComponent.convertImage(data);
          this.reloadData();
          this.selectedFile = null;

          if(this.fileInput !== null)
            this.fileInput.nativeElement.value = '';

          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }else{
      this.subs.add(this.endpoints.putAudioFile(this.data.id, this.selectedFile).subscribe({
        next: (data) => {
          this.customSuccessText = 'The file was replaced successfully';
          this.data = FilesManagerComponent.convertAudio(data);
          this.reloadData();
          this.selectedFile = null;
          if(this.fileInput !== null)
            this.fileInput.nativeElement.value = '';

          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
  }

  public override submit():void{
    this.clearMessages();
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

  public onFileSelect(event:any):void {
    if(event && event.target.files.length > 0){
      // Does not work: this.controls.fileControl.setValue(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
  }
}
