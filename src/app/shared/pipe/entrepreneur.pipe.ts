import { Entrepreneurs } from '../model/entrepreneurs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entrepreneur'
})
export class EntrepreneurPipe implements PipeTransform {

  transform(entrepreneurs: Entrepreneurs[], text: string): Entrepreneurs[] {
    if(text ==null || text == ""){
      return entrepreneurs;
    }
    return entrepreneurs.filter(n=>
      n.entrepreneurName.toLowerCase().includes(text) || n.entrepreneurName.toUpperCase().includes(text)
    );
  }
}
