import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoryScenesEndpointsService } from 'src/app/core/api-endpoints/story-scenes-endpoints.service';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { CreateStorySceneFormControls, StorySceneFormHelperService } from 'src/app/ui-helpers/forms/story-scene-form-helper.service';

const emptyCreateStorySceneArgs:CreateStorySceneArgs = {
  storySceneId: 0
}
export interface CreateStorySceneArgs {
  storySceneId:number
}

@Component({
  selector: 'app-create-story-scene',
  templateUrl: './create-story-scene.component.html',
  styleUrls: ['./create-story-scene.component.scss']
})
export class CreateStorySceneComponent extends BaseFormComponent implements OnInit {

  public controls:CreateStorySceneFormControls;

  @Input() args:CreateStorySceneArgs = emptyCreateStorySceneArgs; 
  @Output() finishedEvent = new EventEmitter<ReadStorySceneModel|null>();

  constructor(private formHelper:StorySceneFormHelperService, private endpoints:StoryScenesEndpointsService) { 
    super();

    this.controls = formHelper.createControls();
    this.form = formHelper.createForm(this.controls);
  }

  override ngOnInit(): void {
    super.ngOnInit();

  }

  public override submit():void{
    if(!this.canSubmitAndTouchForm()){
      return;
    }

    this.startLoadAndClearErrors();
    const model = this.formHelper.createModel(this.controls);
    
    this.subs.add(this.endpoints.post(this.args.storySceneId, model).subscribe({
      next: (data) => {
        this.endLoad();
        this.resetData();
        this.finishedEvent.emit(data);
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  private resetData():void {
    // TODO: maybe move this to the form helper?
    this.controls.titleControl.setValue('');
  }

  public cancel():void{
    this.resetData();
    this.finishedEvent.emit(null);
  }
}
