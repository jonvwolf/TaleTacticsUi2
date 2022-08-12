import { defaultReadStoryModel, ReadStoryModel } from "./read-story-model";

export const defaultReadGameStateModel:ReadGameStateModel = {
    code: '',
    story: defaultReadStoryModel
};

export interface ReadGameStateModel {
    code:string,
    story:ReadStoryModel
}
