import { Investment } from './../../../shared/model/investment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/shared/services/investment.service';

@Component({
  selector: 'app-single-investment',
  templateUrl: './single-investment.component.html',
  styleUrls: ['./single-investment.component.css']
})
export class SingleInvestmentComponent implements OnInit {

  
  id: number;
  investments: any = [];
  data:Investment;
  exist: boolean =false;
  
  searchText: string;

  investment_IMAGE: string;
  constructor(private investmentService: InvestmentService, private route: ActivatedRoute,
     private router: Router) { 
    this.investment_IMAGE=investmentService.IMAGE_URL;
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
