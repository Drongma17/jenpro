import { Businessac } from './../model/businessac';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessac'
})
export class BusinessacPipe implements PipeTransform {

 
  transform(businessac: Businessac[], text: string): Businessac[] {
    if(text ==null || text == ""){
      return businessac;
    }
    return businessac.filter(n=>
      n.businessacName.toLowerCase().includes(text) || n.businessacName.toUpperCase().includes(text)
    );
  }
}