import { ReadStorySceneCommandModel } from "./read-story-scene-command-model";

export const defaultReadStorySceneModel:ReadStorySceneModel = {
    id: 0,
    title: '',
    storySceneCommands: []
};

export interface ReadStorySceneModel {
    id:number,
    title:string,
    storySceneCommands:ReadStorySceneCommandModel[]
}
