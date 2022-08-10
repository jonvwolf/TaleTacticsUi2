export interface CreateStorySceneCommandModel {
    title:string,
    texts:string|null,
    timers:number[]|null,
    images:number[]|null,
    audios:number[]|null,
    minigames:number[]|null
}
