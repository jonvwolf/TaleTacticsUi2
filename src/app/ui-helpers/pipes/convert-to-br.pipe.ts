import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToBr'
})
export class ConvertToBrPipe implements PipeTransform {

  transform(value: string, replaceWith:string = '<br>'): string {
    if(!value){
      return '';
    }

    // TODO: once the api normalizes the break lines, remove all but one
    return value.replace('\r\n', replaceWith).replace('\r', replaceWith).replace('\n', replaceWith);
  }

}
