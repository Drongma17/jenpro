import { Investment } from './../model/investment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'investment'
})
export class InvestmentPipe implements PipeTransform {

  transform(investment: Investment[], text: string): Investment[] {
    if(text ==null || text == ""){
      return investment;
    }
    return investment.filter(n=>
      n.investmentName.toLowerCase().includes(text) || n.investmentName.toUpperCase().includes(text)
    );
  }
}