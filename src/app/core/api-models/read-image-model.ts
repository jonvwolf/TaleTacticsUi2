import { FileFormatEnum } from "./file-format-enum";

export interface ReadImageModel {
    id:number,
    name:string,
    width:number,
    height:number,
    format:FileFormatEnum,
    absoluteUrl:string,
    isScanned:boolean,
    size:number
}
