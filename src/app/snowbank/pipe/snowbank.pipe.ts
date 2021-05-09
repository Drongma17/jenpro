import { Snowbank } from './../model/snowbank';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snowbank'
})
export class SnowbankPipe implements PipeTransform {

  transform(snowbanks: Snowbank[], text: string): Snowbank[] {
    if(text ==null || text == ""){
      return snowbanks;
    }
    return snowbanks.filter(n=>
      n.customerName.toLowerCase().includes(text) || n.customerName.toUpperCase().includes(text)
    );
  }
}
