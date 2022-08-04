import { ReadAudioModel } from "./read-audio-model";
import { ReadImageModel } from "./read-image-model";
import { ReadMinigameModel } from "./read-minigame-model";

export interface ReadStorySceneCommandModel {
    id:number,
    title:string,
    texts:string[],
    timers:number[],
    images:ReadImageModel[],
    audios:ReadAudioModel[],
    minigames:ReadMinigameModel[]
}
