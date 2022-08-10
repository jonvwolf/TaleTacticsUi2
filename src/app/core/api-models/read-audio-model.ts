import { FileFormatEnum } from "./file-format-enum";

export const checkIfReadAudioModel = (obj:any): obj is ReadAudioModel => {
    return obj && 'name' in obj && 'isBgm' in obj;
};

export interface ReadAudioModel {
    id:number,
    name:string,
    isBgm:boolean,
    durationSeconds:number,
    format:FileFormatEnum,
    absoluteUrl:string,
    isScanned:boolean,
    size:number
}
