import { ReadAudioModel } from "./read-audio-model";
import { ReadImageModel } from "./read-image-model";
import { ReadMinigameModel } from "./read-minigame-model";

export interface ReadGameConfiguration {
    images:ReadImageModel,
    audios:ReadAudioModel,
    minigames:ReadMinigameModel
}
