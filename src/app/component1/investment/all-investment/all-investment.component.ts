import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/model/investment';
import { InvestmentService } from 'src/app/shared/services/investment.service';

@Component({
  selector: 'app-all-investment',
  templateUrl: './all-investment.component.html',
  styleUrls: ['./all-investment.component.css']
})
export class AllInvestmentComponent implements OnInit {

  investments$: Observable<Investment[]>;
  investments: Investment[];
  public investment_IMAGE: string;
  searchInvestment: string;
  
 
  constructor(private investmentService: InvestmentService,
    private route: ActivatedRoute) {
    this.investment_IMAGE=investmentService.IMAGE_URL;
   }


  ngOnInit() {
    this.route.paramMap.subscribe( param => {
       this.investmentService.getInvestmentByCategoryName(param.get('investmentCategory'))
      .subscribe(result => {
        this.investments = result;
    });
    })
  }


}
