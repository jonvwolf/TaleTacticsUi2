import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { htConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StartGameDialogComponent } from 'src/app/ui-helpers/dialogs/start-game-dialog/start-game-dialog.component';
import { SecuredAppUiGeneralElements, SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

const fullsizeTableColumns = ['id', 'title', 'description', 'game-start'];
const handsetTableColumns = ['title', 'game-start'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  // TODO: organize code (duplication)
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  
  public tableColumns:string[] = fullsizeTableColumns;
  public dataSource:MatTableDataSource<ReadStoryModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  @ViewChild(MatSort) sort: MatSort|null = null;

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Home'
  }; }

  constructor(private stories:StoriesEndpointsService, private router:Router,
    private dialog:MatDialog, private breakpointObserver: BreakpointObserver) {
    super();

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  override ngOnInit(): void {
    super.ngOnInit();

    this.subs.add(this.isHandset$.subscribe(isHandset => {
      if(isHandset){
        this.tableColumns = handsetTableColumns;
      }else{
        this.tableColumns = fullsizeTableColumns;
      }
    }));

    this.startLoadAndClearErrors();
    this.subs.add(this.stories.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public applyFilter(event:Event):void{
    // TODO: repeated code
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  public storyRowClick(readStoryModel:ReadStoryModel):void {
    this.router.navigate(htConstants.getPathSecuredStoryScenesEditor(readStoryModel.id));
  }

  public deleteStoryRowClick(readStoryModel:ReadStoryModel):void {
    if(confirm('Are you sure to delete this story? This action cannot be undone. All story scenes and commands will be lost. Images and Audios are preserved')){
      this.startLoadAndClearErrors();
      this.subs.add(this.stories.delete(readStoryModel.id).subscribe({
        next: (data) => {

          const list = this.dataSource.data;
          const index = list.findIndex((item) => item.id === readStoryModel.id);
          if(index >= 0){
            list.splice(index, 1);
            this.dataSource.data = list;
          }

          this.endLoad();
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
  }

  public startGame(readStoryModel:ReadStoryModel):void {
    this.dialog.open(StartGameDialogComponent, {data: readStoryModel, disableClose: true});
  }
}
