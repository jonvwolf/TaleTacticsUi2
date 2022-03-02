import { FileFormatEnum } from "./file-format-enum";

export interface ReadAudioModel {
    id:number,
    name:string,
    isBgm:boolean,
    durationSeconds:number,
    format:FileFormatEnum,
    absoluteUrl:string,
    isScanned:boolean
}
