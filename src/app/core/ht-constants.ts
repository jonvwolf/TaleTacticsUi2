export class HtConstants {
    public static get securedBasePath():string { return '/secured'; }
    public static get localStorageJwt():string { return 'ht-jwt'; }

    public static get pathLogin():any[] { return ['/']; }
    public static get pathSecuredHome():any[] { return ['/secured/home']; }
    
    public static getPathSecuredUpdateStory(id:number):any[] {
        return ['/secured/stories', id];
    }
}
