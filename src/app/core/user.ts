import * as moment from 'moment';

export class User {

    private _expiresOn:moment.Moment = moment();
    public get expiresOn():moment.Moment { return this._expiresOn; }

    private _isValid:boolean = false;
    public get isValidAndNotExpired():boolean { return this._isValid && !this.hasExpired(); }
    public get isValid():boolean { return this._isValid; }

    constructor(jwt:any){
        try{
            if(jwt === null || jwt === undefined){
                this._isValid = false;
                return;
            }

            const expires = User.getNumberValue('exp', jwt);
            this._expiresOn = moment.unix(expires);
            if(!this._expiresOn.isValid()){
                throw new Error('exp is not valid as per moment');
            }

            this._isValid = true;
        }catch(err){
            this._isValid = false;
            // TODO: log
            console.error('Invalid Jwt', err);
        }
    }

    public hasExpired():boolean {
        return this._expiresOn.isSameOrBefore(moment());
    }

    private static getStringValue(key:string, jwt:any):string{
        if(jwt.hasOwnProperty(key)){
            return jwt[key];
        }
        throw new Error('Invalid Jwt: ' + key);
    }

    private static getNumberValue(key:string, jwt:any):number{
        if(jwt.hasOwnProperty(key)){
            return jwt[key];
        }
        throw new Error('Invalid Jwt: ' + key);
    }
}
