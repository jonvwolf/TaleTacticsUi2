import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GamesEndpointsService } from 'src/app/core/api-endpoints/games-endpoints.service';
import { ReadGameStateModel } from 'src/app/core/api-models/read-game-state-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  public tableColumns:string[] = ['title', 'story', 'buttons'];
  public dataSource:MatTableDataSource<ReadGameStateModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator|null = null;
  @ViewChild(MatSort) sort: MatSort|null = null;

  constructor(private endpoints:GamesEndpointsService) {
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
        let id = 1;
        for(let item of data){
          item.id = id++;
        }
        this.dataSource.data = data;
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public deleteGame(game:ReadGameStateModel):void{

  }

  public resume(game:ReadGameStateModel):void{

  }
}
