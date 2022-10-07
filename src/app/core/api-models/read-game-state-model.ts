import { defaultReadStoryModel, ReadStoryModel } from "./read-story-model";

export const defaultReadGameStateModel:ReadGameStateModel = {
    code: '',
    notes: '',
    story: defaultReadStoryModel
};

export interface ReadGameStateModel {
    code:string,
    notes:string,
    story:ReadStoryModel
}
