import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTimer'
})
export class ShowTimerPipe implements PipeTransform {

  transform(value: number): string {
    if(!value){
      return '00:00';
    }

    if(value > 0){
      const n1 = Math.floor(value / 60);
      const n2 = value % 60;

      let ret = '';
      if(n1 < 10)
        ret = '0' + n1;
      else
        ret = '' + n1;

      if(n2 < 10)
        ret += ':0' + n2;
      else
        ret += ':' + n2;
      
      return ret;
    }else{
      return '00:00';
    }

  }

}
