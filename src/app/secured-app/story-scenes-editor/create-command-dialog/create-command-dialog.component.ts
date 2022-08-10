import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { checkIfReadAudioModel, ReadAudioModel } from 'src/app/core/api-models/read-audio-model';
import { checkIfReadImageModel, ReadImageModel } from 'src/app/core/api-models/read-image-model';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { FilesCacheService } from 'src/app/core/caches/files-cache.service';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { CommandFormHelperService, CreateCommandFormControls } from 'src/app/ui-helpers/forms/command-form-helper.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { CommandsEndpointsService } from 'src/app/core/api-endpoints/commands-endpoints.service';
import { ReadStorySceneCommandModel } from 'src/app/core/api-models/read-story-scene-command-model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CreateCommandDialogArgs {
  scene:ReadStorySceneModel,
  command:ReadStorySceneCommandModel|null,
};

@Component({
  selector: 'app-create-command-dialog',
  templateUrl: './create-command-dialog.component.html',
  styleUrls: ['./create-command-dialog.component.scss']
})
export class CreateCommandDialogComponent extends BaseFormComponent implements OnInit {

  public buttonText:string;
  public separatorKeyCodes: number[] = [COMMA, ENTER];

  public controls:CreateCommandFormControls;
  private allImages:ReadImageModel[] = [];
  private allAudios:ReadAudioModel[] = [];

  public selectedAudios:ReadAudioModel[] = [];
  // Only one is accepted but it is an array to make it work with chip autocomplete
  public selectedImages:ReadImageModel[] = [];
  public filteredImages:Observable<ReadImageModel[]> = new Observable();
  public filteredAudios:Observable<ReadAudioModel[]> = new Observable();

  public audioControl:FormControl = new FormControl('');
  public imageControl:FormControl = new FormControl('');

  @ViewChild('audioChipInput') audioChipInput: ElementRef<HTMLInputElement>|null = null;
  @ViewChild('imageChipInput') imageChipInput: ElementRef<HTMLInputElement>|null = null;
  
  constructor(public dialogRef:MatDialogRef<CreateCommandDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateCommandDialogArgs,
  private formHelper:CommandFormHelperService, private cache:FilesCacheService, private endpoints:CommandsEndpointsService,
  private snackBar:MatSnackBar) {
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls);

    if(data.command !== null){
      // Edit mode
      // can't have controls update here (see on init)
      this.selectedAudios = data.command.audios;
      this.selectedImages = data.command.images;
      this.buttonText = 'Update';
    }else{
      this.buttonText = 'Create';
    }
    
    this.filteredAudios = this.audioControl.valueChanges.pipe(
      startWith(null),
      map((audio:ReadAudioModel) => (audio ? this._filter(audio) : this.allAudios.slice()))
    );

    this.filteredImages = this.imageControl.valueChanges.pipe(
      startWith(null),
      map((image:ReadImageModel) => (image ? this._filterImage(image) : this.allImages.slice()))
    );
  }

  private _filterImage(value:ReadImageModel) : ReadImageModel[]{
    const filterValue = value.name.toLowerCase();
    return this.allImages.filter(image => image.name.toLowerCase().includes(filterValue) );
  }
  private _filter(value: ReadAudioModel): ReadAudioModel[] {
    const filterValue = value.name.toLowerCase();
    return this.allAudios.filter(audio => audio.name.toLowerCase().includes(filterValue) );
  }

  public remove(audio:ReadAudioModel):void{
    const index = this.selectedAudios.findIndex((model) => model.id === audio.id);
    if(index > -1){
      this.selectedAudios.splice(index, 1);
    }
  }

  public selected(event:MatAutocompleteSelectedEvent):void{
    if(checkIfReadAudioModel(event.option.value)){
      const index = this.selectedAudios.findIndex((item) => item.id === event.option.value.id);
      if(index > -1){
        // already selected
      }else{
        this.selectedAudios.push(event.option.value);
      }
      
      if(this.audioChipInput !== null)
        this.audioChipInput.nativeElement.value = '';
      
      this.audioControl.setValue(null);
    }else{
      console.error('Selected item is not audio model');
    }
    
  }

  public removeImage(audio:ReadImageModel):void{
    const index = this.selectedImages.findIndex((model) => model.id === audio.id);
    if(index > -1){
      this.selectedImages.splice(index, 1);
    }
  }

  public selectedImage(event:MatAutocompleteSelectedEvent):void{
    if(checkIfReadImageModel(event.option.value)){
      const index = this.selectedImages.findIndex((item) => item.id === event.option.value.id);
      if(index > -1){
        // already selected
      }else{
        this.selectedImages = [event.option.value];
      }
      
      if(this.imageChipInput !== null)
        this.imageChipInput.nativeElement.value = '';
      
      this.imageControl.setValue(null);
    }else{
      console.error('Selected item is not image model');
    }
    
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if(this.data.command !== null){
      this.formHelper.setControls(this.data.command, this.controls);
    }
    
    this.startLoadAndClearErrors();
    this.subs.add(this.cache.getAudios(false).subscribe({
      next: (data) => {
        this.allAudios = data;

        this.subs.add(this.cache.getImages(false).subscribe({
          next: (data) => {
            this.allImages = data;

            this.endLoad();
          },
          error: (err) => {
            this.endLoadAndHandleError(err);
          }
        }));
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public close():void{
    if(this.data.command === null)
      this.dialogRef.close();
    else
      this.dialogRef.close(this.data.command);
  }

  public override submit():void {
    this.clearMessages();
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    let selectedImage:ReadImageModel|null = null;
    if(this.selectedImages.length > 0){
      selectedImage = this.selectedImages[0];
    }

    if(selectedImage !== null && this.controls.miniGameControl.value === true){
      this.customErrorText = 'Cannot have show image and start minigame in the same command';
      return;
    }

    this.startLoadAndClearErrors();

    const model = this.formHelper.createModel(this.controls, this.selectedAudios, selectedImage);
    
    if(this.data.command === null){
      this.subs.add(this.endpoints.post(this.data.scene.id, model).subscribe({
        next: (data) => {
          this.endLoad();
          this.dialogRef.close(data);
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }else{
      this.subs.add(this.endpoints.put(this.data.command.id, model).subscribe({
        next: (data) => {
          this.endLoad();
          
          // TODO: this should be a common function or just for the config rather
          this.snackBar.open('Command updated successfully', 'Close', {
            duration: 8000,
            panelClass: ['success-snack-bar']
          });
          this.data.command = data;
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
    
  }
}
