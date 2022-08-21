export const checkIfHmCommandModel = (obj:any): obj is HmCommandModel => {
    return obj && ('audioIds' in obj || 'imageId' in obj || 'minigameId' in obj || 'timer' in obj || 'text' in obj);
};

export interface HmCommandModel {
    audioIds?:number[],
    imageId?:number,
    minigameId?:number,
    timer?:number,
    text?:string
}
