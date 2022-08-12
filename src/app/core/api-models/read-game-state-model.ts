import { defaultReadStoryModel, ReadStoryModel } from "./read-story-model";

export const defaultReadGameStateModel:ReadGameStateModel = {
    id: 0,
    code: '',
    story: defaultReadStoryModel
};

export interface ReadGameStateModel {
    id:number,
    code:string,
    story:ReadStoryModel
}
