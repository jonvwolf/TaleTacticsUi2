import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoryScenesEndpointsService } from 'src/app/core/api-endpoints/story-scenes-endpoints.service';
import { checkIfReadStorySceneCommandModel } from 'src/app/core/api-models/read-story-scene-command-model';
import { defaultReadStorySceneModel, ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StorySceneFormHelperService, UpdateStorySceneFormControls } from 'src/app/ui-helpers/forms/story-scene-form-helper.service';
import { CreateCommandDialogComponent } from '../create-command-dialog/create-command-dialog.component';

@Component({
  selector: 'app-edit-story-scene',
  templateUrl: './edit-story-scene.component.html',
  styleUrls: ['./edit-story-scene.component.scss']
})
export class EditStorySceneComponent extends BaseFormComponent implements OnInit {

  public controls:UpdateStorySceneFormControls;

  @Input() model:ReadStorySceneModel = defaultReadStorySceneModel;

  constructor(private dialog:MatDialog, private formHelper:StorySceneFormHelperService, private endpoints:StoryScenesEndpointsService,
    private snackBar:MatSnackBar) {
    super();

    this.controls = formHelper.createUpdateControls();
    this.form = formHelper.createUpdateForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.formHelper.setUpdateValues(this.model, this.controls);
  }

  public override submit():void {
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.startLoadAndClearErrors();

    const model = this.formHelper.createUpdateModel(this.controls);

    this.subs.add(this.endpoints.put(this.model.id, model).subscribe({
      next: (data) => {
        // TODO: this should be in the formhelper, right? update all values from old model to new model
        // . Can't just set the whole model because the reference is lost and parent component can't update accordingly
        this.model.title = model.title; //Right now it's fine with only title because thats the onyl thing that can be updated
        this.formHelper.setUpdateValues(this.model, this.controls);
        this.endLoad();

        // TODO: this should be a common function or just for the config rather
        this.snackBar.open('Scene updated successfully', 'Close', {
          duration: 8000,
          panelClass: ['success-snack-bar']
        });
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public addCommand():void{
    var dialog = this.dialog.open(CreateCommandDialogComponent, {data: this.model, disableClose: true});
    this.subs.add(dialog.afterClosed().subscribe({
      next: (data) => {
        // TODO: me quede en esto tambien
        if(checkIfReadStorySceneCommandModel(data)){
          this.model.storySceneCommands.push(data);
        }
      }
    }));
  }
}
