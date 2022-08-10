export interface UpdateStorySceneCommandModel {
    title:string,
    texts:string|null,
    timers:number[],
    images:number[],
    audios:number[],
    minigames:number[]
}
