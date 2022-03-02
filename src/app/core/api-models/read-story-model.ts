import { ReadStorySceneModel } from "./read-story-scene-model";

export const defaultReadStoryModel:ReadStoryModel = {
    id: 0,
    title: '',
    description: '',
    storyScenes: []
};
export interface ReadStoryModel {
    id:number,
    title:string,
    description:string,
    storyScenes: ReadStorySceneModel[]
}
