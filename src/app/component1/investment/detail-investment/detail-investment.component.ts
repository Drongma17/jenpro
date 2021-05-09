import { Investment } from './../../../shared/model/investment';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentService } from './../../../shared/services/investment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-investment',
  templateUrl: './detail-investment.component.html',
  styleUrls: ['./detail-investment.component.css']
})
export class DetailInvestmentComponent implements OnInit {

 
  id: number;
  investments: any = [];
  data:Investment;
  exist: boolean =false;
  
  searchInvestment: string;

  investmentFile: string;
  constructor(private investmentService: InvestmentService, private route: ActivatedRoute, private router: Router) { 
    this.investmentFile=investmentService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.investmentService.getAllInvestments().subscribe((res)=> {
      this.investments =res;
      for(var i= 0; i< this.investments.length; i++){
        if(parseInt(this.investments[i].id) === this.id){
            this.exist =true;
             this.data =this.investments[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  refresh(){
    for(var i= 0; i< this.investments.length; i++){
      if(parseInt(this.investments[i].id) === this.id){
          this.exist =true;
           this.data =this.investments[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  
}
