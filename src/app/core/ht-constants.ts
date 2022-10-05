import { environment } from "src/environments/environment";

export class HtConstants {
    // TODO: these must be gotten from API
    public allowedFileExtensions = ['png', 'jpeg', 'jpg', 'mp3'];
    public allowedMaxFileSizeInKb = 2048;

    public get securedBasePath():string { return '/secured'; }
    public get localStorageJwt():string { return 'ht-jwt'; }

    public get pathLogin():any[] { return ['/']; }
    public get pathSecuredHome():any[] { return ['/secured/home']; }
    public get pathSecuredHomeForRoutes():string { return '/secured/home'; }

    public get pathSecuredCreateStory():any[] { return ['/secured/stories/create']; }

    public get pathSecuredFileManager():any[] { return ['/secured/files']; }

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
        return ['/secured-game/games', storyId, gameCode];
    }

    public getPathForUnity(gameCode:string):string {
        return environment.host + '/' + environment.pathToUnity + '?code=' + gameCode;
    }
}

export const htConstants = new HtConstants();