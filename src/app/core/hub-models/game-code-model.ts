export const emptyGameCodeModel:GameCodeModel = {
    gameCode: ''
};

export const checkIfGameCodeModel = (obj:any): obj is GameCodeModel => {
    return obj && 'gameCode' in obj;
};

export interface GameCodeModel {
    gameCode:string
}
