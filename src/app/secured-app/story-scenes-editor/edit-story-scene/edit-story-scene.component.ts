import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoryScenesEndpointsService } from 'src/app/core/api-endpoints/story-scenes-endpoints.service';
import { checkIfReadStorySceneCommandModel, ReadStorySceneCommandModel } from 'src/app/core/api-models/read-story-scene-command-model';
import { defaultReadStorySceneModel, ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { StorySceneFormHelperService, UpdateStorySceneFormControls } from 'src/app/ui-helpers/forms/story-scene-form-helper.service';
import { CreateCommandDialogArgs, CreateCommandDialogComponent } from '../create-command-dialog/create-command-dialog.component';

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
        this.model.title = data.title; //Right now it's fine with only title because thats the onyl thing that can be updated
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
    const args:CreateCommandDialogArgs = {scene:this.model, command: null};
    const dialog = this.dialog.open(CreateCommandDialogComponent, {data: args, disableClose: true});
    this.subs.add(dialog.afterClosed().subscribe({
      next: (data) => {
        if(checkIfReadStorySceneCommandModel(data)){
          // TODO: this should be a common function or just for the config rather
          this.snackBar.open('Command added successfully', 'Close', {
            duration: 8000,
            panelClass: ['success-snack-bar']
          });

          this.model.storySceneCommands.push(data);
        }
      }
    }));
  }

  public editCommand(cmd:ReadStorySceneCommandModel):void{
    const args:CreateCommandDialogArgs = {scene:this.model, command: cmd};
    const dialog = this.dialog.open(CreateCommandDialogComponent, {data: args, disableClose: true});
    this.subs.add(dialog.afterClosed().subscribe({
      next: (data) => {
        if(checkIfReadStorySceneCommandModel(data)){
          const index = this.model.storySceneCommands.findIndex((item) => item.id === data.id);
          // This is fine to replace reference, because there is no @Input where the command ref is given
          this.model.storySceneCommands[index] = data;
        }
      }
    }));
  }
}
