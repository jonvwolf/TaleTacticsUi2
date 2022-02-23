import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(value: string, textSize:number, truncateWith:string = '...'): string {
    if(!value){
      return '';
    }
    return value.length > textSize ? value.substring(0, textSize) + truncateWith : value; 
  }

}
