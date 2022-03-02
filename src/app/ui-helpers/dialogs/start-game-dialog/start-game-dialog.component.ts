import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { htConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from '../../base-form-component';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss']
})
export class StartGameDialogComponent extends BaseFormComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<StartGameDialogComponent>,
    private endpoints:StoriesEndpointsService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: ReadStoryModel) {
      super();
    }

  override ngOnInit(): void {
  }

  public startGame():void {
    this.startLoadAndClearErrors();
    
    this.subs.add(this.endpoints.postGame(this.data).subscribe({
      next: (data) => {
        this.router.navigate(htConstants.getPathSecuredGame(this.data.id, data.gameCode));
        this.endLoad();
        this.dialogRef.close();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public close():void {
    this.dialogRef.close();
  }
}
