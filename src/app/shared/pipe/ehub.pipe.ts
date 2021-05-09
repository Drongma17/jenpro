import { Pipe, PipeTransform } from '@angular/core';
import { Ehub } from '../model/ehub';

@Pipe({
  name: 'ehub'
})
export class EhubPipe implements PipeTransform {

  transform(ehub: Ehub[], text: string): Ehub[] {
    if(text ==null || text == ""){
      return ehub;
    }
    return ehub.filter(n=>
      n.ehubName.toLowerCase().includes(text) || n.ehubName.toUpperCase().includes(text)
    );
  }
}
