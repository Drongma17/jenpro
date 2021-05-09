import { Ste } from './../model/ste';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ste'
})
export class StePipe implements PipeTransform {

  transform(stes: Ste[], text: string): Ste[] {
    if(text ==null || text == ""){
      return stes;
    }
    return stes.filter(n=>
      n.steName.toLowerCase().includes(text) || n.steName.toUpperCase().includes(text)
    );
  }
}