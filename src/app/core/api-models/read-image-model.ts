import { FileFormatEnum } from "./file-format-enum";

export const checkIfReadImageModel = (obj:any): obj is ReadImageModel => {
    return obj && 'name' in obj && 'width' in obj;
};

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
