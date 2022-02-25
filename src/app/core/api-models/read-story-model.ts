export const defaultReadStoryModel:ReadStoryModel = {
    id: 0,
    title: '',
    description: ''
};
export interface ReadStoryModel {
    id:number,
    title:string,
    description:string
    // TODO: ReadStorySceneModel
}
