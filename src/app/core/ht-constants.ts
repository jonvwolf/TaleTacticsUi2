export class HtConstants {
    public get securedBasePath():string { return '/secured'; }
    public get localStorageJwt():string { return 'ht-jwt'; }

    public get pathLogin():any[] { return ['/']; }
    public get pathSecuredHome():any[] { return ['/secured/home']; }

    public get pathSecuredCreateStory():any[] { return ['/secured/stories/create']; }

    public get updateStoryIdParamName():string { return 'id'; }
    public getPathSecuredUpdateStory(id:number):any[] {
        return ['/secured/stories/update', id];
    }
    public getPathSecuredStoryScenesEditor(id:number):any[] {
        return ['/secured/stories/scenes-editor', id];
    }

    public get gameStoryIdParamName():string { return 'storyId'; }
    public get gameGameCodeParamName():string { return 'gameCode'; }
    public getPathSecuredGame(storyId:number, gameCode:string):any[] {
        return ['/secured/games', storyId, gameCode];
    }
}

export const htConstants = new HtConstants();