import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileFormatEnum } from '../core/api-models/file-format-enum';
import { ReadAudioModel } from '../core/api-models/read-audio-model';
import { ReadImageModel } from '../core/api-models/read-image-model';
import { htConstants } from '../core/ht-constants';
import { FileFormHelperService, UploadFileFormControls } from '../file-form-helper.service';
import { FilesEndpointsService } from '../files-endpoints.service';
import { BaseFormComponent } from '../ui-helpers/base-form-component';
import { EditFileDialogComponent } from '../ui-helpers/dialogs/edit-file-dialog/edit-file-dialog.component';
import { SecuredAppUiGeneralElements } from '../ui-helpers/secured-app-ui.service';

const fullsizeTableColumns = ['name', 'format', 'commands', 'size'];

// TODO: repeated code
const invalidFileTypeMessage = 'Invalid file. Select only jpeg, png or mp3';
const invalidFileSizeMessage = 'Maximum file size of 2 megabytes allowed';

export interface IFileItem {
  id:number,
  name:string,
  format:string,
  size:number,
  audioModel:ReadAudioModel|null,
  imageModel:ReadImageModel|null
}

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  @ViewChild(MatSort) sort: MatSort|null = null;

  public tableColumns:string[] = fullsizeTableColumns;
  public dataSource:MatTableDataSource<IFileItem> = new MatTableDataSource();

  // TODO: form and controls are useless for now... mat does not support file and
  // . can't set the file to the control value
  public controls: UploadFileFormControls;
  public selectedFile:File|null = null;

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Files manager'
  }; }

  constructor(private dialog:MatDialog, private formHelper:FileFormHelperService, private endpoints:FilesEndpointsService) {
    super();

    this.controls = formHelper.createUploadControls();
    this.form = formHelper.createForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.loadData();
  }

  private loadData():void {
    this.startLoadAndClearErrors();

    const items:IFileItem[] = [];
    this.subs.add(this.endpoints.getAllImages().subscribe({
      next: (data) => {
        const images = data.map(image => (FilesManagerComponent.convertImage(image)));
        
        for(let image of images){
          items.push(image);
        }
        
        this.subs.add(this.endpoints.getAllAudios().subscribe({
          next: (data) => {
            const audios = data.map(audio => (FilesManagerComponent.convertAudio(audio)));
            for(let audio of audios){
              items.push(audio);
            }
            
            this.dataSource.data = items;
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

  public static convertAudio(audio:ReadAudioModel):IFileItem{
    return {id: audio.id, name: audio.name, format: FileFormatEnum[audio.format], audioModel: audio, imageModel: null, size: audio.size};
  }
  public static convertImage(image:ReadImageModel):IFileItem{
    return {id: image.id, name: image.name, format: FileFormatEnum[image.format], audioModel: null, imageModel: image, size: image.size};
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public override submit(): void {
    if(!this.canSubmitAndTouchForm()){
      return;
    }

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
    
    this.customErrorText = null;
    this.startLoadAndClearErrors();

    if(this.selectedFile.type.startsWith("image/")){
      this.subs.add(this.endpoints.postImage(this.selectedFile).subscribe({
        next: (data) => {
          const list = this.dataSource.data;
          list.unshift(FilesManagerComponent.convertImage(data));
          this.dataSource.data = list;
          this.controls.fileControl.setValue('');
          this.selectedFile = null;
          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }else{
      this.subs.add(this.endpoints.postAudio(this.selectedFile).subscribe({
        next: (data) => {
          const list = this.dataSource.data;
          list.unshift(FilesManagerComponent.convertAudio(data));
          this.dataSource.data = list;
          this.controls.fileControl.setValue('');
          this.selectedFile = null;
          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
  }

  public applyFilter(event:Event):void{
    // TODO: repeated code
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  public openEditDialog(file:IFileItem):void {
    var dialog = this.dialog.open(EditFileDialogComponent, {data: file, disableClose: true});
    this.subs.add(dialog.afterClosed().subscribe({
      next: (v) => {
        this.loadData();
      }
    }));
  }

  public onFileSelect(event:any):void {
    if(event && event.target.files.length > 0){
      // Does not work: this.controls.fileControl.setValue(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
  }
}
