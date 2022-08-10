import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateStorySceneCommandModel } from 'src/app/core/api-models/create-story-scene-command-model';
import { ReadAudioModel } from 'src/app/core/api-models/read-audio-model';
import { ReadImageModel } from 'src/app/core/api-models/read-image-model';
import { ReadStorySceneCommandModel } from 'src/app/core/api-models/read-story-scene-command-model';

export interface CreateCommandFormControls {
  titleControl: FormControl,
  textControl: FormControl,
  miniGameControl: FormControl,
  timerControl: FormControl,
  // material chip autocomplete does not use as value
  //imageControl: FormControl,
  // material chip autocomplete sets this as null...
  //audiosControl: FormControl
}

@Injectable({
  providedIn: 'root'
})
export class CommandFormHelperService {

  constructor() { }

  public createControls():CreateCommandFormControls {
    return {
      titleControl: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      textControl: new FormControl('', [Validators.minLength(1), Validators.maxLength(5000)]),
      miniGameControl: new FormControl(''),
      timerControl: new FormControl('', [Validators.min(1)])
    };
  }

  public createForm(controls:CreateCommandFormControls) :FormGroup {
    return new FormGroup({
      titleControl: controls.titleControl,
      textControl: controls.textControl,
      miniGameControl: controls.miniGameControl,
      timerControl: controls.timerControl
    });
  }

  public createModel(controls:CreateCommandFormControls, audios:ReadAudioModel[], image:ReadImageModel|null):CreateStorySceneCommandModel {
    let imageIds:number[]|null = null;
    if(image !== null){
      imageIds = [image.id];
    }else{
      imageIds = [];
    }

    let minigames:number[]|null = null;
    if(controls.miniGameControl.value === true){
      // TODO: For now, it does not matter what value
      minigames = [1];
    }else{
      minigames = [];
    }

    let texts:string|null = null;
    if(controls.textControl.value && controls.textControl.value.length > 0){
      texts = controls.textControl.value;
    }

    let timers:number[]|null = null;
    if(controls.timerControl.value > 0){
      timers = [controls.timerControl.value];
    }else{
      timers = [];
    }

    let audioIds:number[]|null = null;
    if(audios.length > 0){
      audioIds = audios.map((item) => item.id);
    }else{
      audioIds = [];
    }

    return {
      title: controls.titleControl.value,
      audios: audioIds,
      images: imageIds,
      minigames: minigames,
      texts: texts,
      timers: timers
    };
  }

  public setControls(model:ReadStorySceneCommandModel, controls:CreateCommandFormControls):void{
    controls.titleControl.setValue(model.title);
    controls.textControl.setValue(model.texts);

    if(model.minigames && model.minigames.length > 0)
      controls.miniGameControl.setValue(true);

    if(model.timers && model.timers.length > 0)
      controls.timerControl.setValue(model.timers[0]);
    
  }
}
