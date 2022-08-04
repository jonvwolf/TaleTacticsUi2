import { ReadAudioModel } from "./read-audio-model";
import { ReadImageModel } from "./read-image-model";
import { ReadMinigameModel } from "./read-minigame-model";

export const checkIfReadStorySceneCommandModel = (obj:any): obj is ReadStorySceneCommandModel => {
    return 'texts' in obj && 'minigames' in obj;
};

export interface ReadStorySceneCommandModel {
    id:number,
    title:string,
    texts:string[],
    timers:number[],
    images:ReadImageModel[],
    audios:ReadAudioModel[],
    minigames:ReadMinigameModel[]
}
