import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { defaultReadStoryModel, ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { htConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements } from 'src/app/ui-helpers/secured-app-ui.service';

@Component({
  selector: 'app-story-scenes-editor',
  templateUrl: './story-scenes-editor.component.html',
  styleUrls: ['./story-scenes-editor.component.scss']
})
export class StoryScenesEditorComponent extends BaseFormComponent implements OnInit {

  public story:ReadStoryModel = defaultReadStoryModel;
  public id:number = 0;

  public showAddPart = false;

  // These can be changed later on using appUI but not inside ngOnInit
  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Story scene editor'
  }; }

  constructor(private endpoints:StoriesEndpointsService, private router:Router, private route:ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const id = this.getNumberParam(htConstants.updateStoryIdParamName, this.route);
    if(id === null){
      this.router.navigate(htConstants.pathSecuredHome);
      return;
    }

    this.id = id;
    this.reloadData();    
  }

  private reloadData():void{
    this.startLoadAndClearErrors();
    this.subs.add(this.endpoints.get(this.id).subscribe({
      next: (data) => {
        this.story = data;
        this.endLoad();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public addStoryPart():void{
    this.showAddPart = true;
  }

  public addStoryPartFinished(model:ReadStorySceneModel|null):void{
    if(model !== null){
      this.story.storyScenes.push(model);
    }
    this.showAddPart = false;
  }
}
