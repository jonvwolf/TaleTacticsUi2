import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GamesEndpointsService } from 'src/app/core/api-endpoints/games-endpoints.service';
import { ReadGameStateModel } from 'src/app/core/api-models/read-game-state-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';

interface IGameItem {
  game:ReadGameStateModel,
  code:string,
  story:string
}

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  public tableColumns:string[] = ['code', 'story', 'buttons'];
  public dataSource:MatTableDataSource<IGameItem> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  @ViewChild(MatSort) sort: MatSort|null = null;

  constructor(private endpoints:GamesEndpointsService, private snackBar:MatSnackBar) {
    super();
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

  override ngOnInit(): void {
    super.ngOnInit();

    this.startLoadAndClearErrors();
    this.subs.add(this.endpoints.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data.map((x) => <IGameItem>{ code: x.code, game: x, story: x.story.title });
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public deleteGame(game:IGameItem):void{
    if(confirm('Are you sure you delete this game? Code: ' + game.code)){
      this.startLoadAndClearErrors();
      this.subs.add(this.endpoints.delete(game.code).subscribe({
        next: (data) => {
          const list = this.dataSource.data;
          const index = list.findIndex((item) => item.code === game.code);
          list.splice(index, 1);
          this.dataSource.data = list;

          this.endLoad();
          // TODO: this should be a common function or just for the config rather
          this.snackBar.open('Game deleted', 'Close', {
            duration: 8000,
            panelClass: ['success-snack-bar']
          });
        },
        error: (err) => {
          this.endLoadAndHandleError(err);
        }
      }));
    }
  }

  public resume(game:IGameItem):void{

  }
}
