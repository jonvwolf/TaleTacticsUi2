import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { htConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StartGameDialogComponent } from 'src/app/ui-helpers/dialogs/start-game-dialog/start-game-dialog.component';
import { SecuredAppUiGeneralElements, SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  public storyList:ReadStoryModel[] = [];
  public dataSource:MatTableDataSource<ReadStoryModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  @ViewChild(MatSort) sort: MatSort|null = null;

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Home'
  }; }

  constructor(private stories:StoriesEndpointsService, private router:Router,
    private dialog:MatDialog) {
    super();

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  override ngOnInit(): void {
    super.ngOnInit();

    this.startLoadAndClearErrors();
    this.subs.add(this.stories.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.storyList = data;
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public applyFilter(event:Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  public storyRowClick(readStoryModel:ReadStoryModel):void {
    this.router.navigate(htConstants.getPathSecuredStoryScenesEditor(readStoryModel.id));
  }

  public startGame(readStoryModel:ReadStoryModel):void {
    this.dialog.open(StartGameDialogComponent, {data: readStoryModel, disableClose: true});
  }
}
