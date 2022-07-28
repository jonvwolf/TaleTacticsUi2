import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseFormComponent } from '../ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements } from '../ui-helpers/secured-app-ui.service';

const fullsizeTableColumns = ['name', 'format'];
export interface IFileItem {
  id:number,
  name:string,
  format:string,
  absolutePath:string
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

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Files manager'
  }; }

  constructor(private dialog:MatDialog) {
    super();

    this.dataSource.data = [{id: 0, name: 'name 1', format: 'jpeg', absolutePath: 'path'}, {id:1, name: 'name 2', format: 'mp3', absolutePath: 'path2'}];
  }

  override ngOnInit(): void {
    super.ngOnInit();

    //this.startLoadAndClearErrors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event:Event):void{
    // TODO: repeated code
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  public startGame(file:IFileItem):void {
    //this.dialog.open(StartGameDialogComponent, {data: readStoryModel, disableClose: true});
  }
}
