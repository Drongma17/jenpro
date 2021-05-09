import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvestmentService } from './../../../../shared/services/investment.service';
import { Observable } from 'rxjs';
import { Investmentallocate } from './../../../../shared/model/investmentallocate';
import { Investment } from './../../../../shared/model/investment';
import { Component, OnInit } from '@angular/core';
import { InvestmentallocateService } from 'src/app/shared/services/investmentallocate.service';

@Component({
  selector: 'app-list-investmentallocate',
  templateUrl: './list-investmentallocate.component.html',
  styleUrls: ['./list-investmentallocate.component.css']
})
export class ListInvestmentallocateComponent implements OnInit {

  searchinvestment: string;
  investments: Investment[];
  investment: Investment;
  investmentPicture: string;
  selectInvestmentId: number;
  allocatedAmount: number;
  allocatedDate: any;
  investmentAllocates$: Observable<Investmentallocate[]>;
  investmentAllocates: Investmentallocate[];
  allocatedsum: number;
  loginAdmin: any ={};
  constructor(private authService:AuthenticationService,private investmentService: InvestmentService, private investmentallocateService: InvestmentallocateService,
    private toastr: ToastrService, private router: Router) {
    this.investmentPicture = investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestment();
    this.getInvestmentallocates();
  }

  getAllInvestment() {
    this.investmentService.getAllInvestments().subscribe(response => {
      this.investments = response;
    })
  }


 getInvestmentallocates(){
  this.investmentallocateService.getAllInvestmentAllocate().subscribe(response => {
    this.investmentAllocates = response;
  })
 }

  getFinanceOfInvestment(investmentId: number) {
    this.selectInvestmentId = investmentId;
    this.investmentService.getInvestment(investmentId).subscribe(response => {
      this.investment = response;
      this.allocatedAmount = this.investment.allocatedAmount;
      this.allocatedDate = this.investment.allocateDate;
    })
   
    this.investmentAllocates$ = this.investmentallocateService.getAllAllocatedByInvestmentId(this.selectInvestmentId);
    this.investmentAllocates$.subscribe(responose => {
      this.investmentAllocates = responose;
      this.allocatedsum = 0.0;
      for (var i = 0; i < this.investmentAllocates.length; i++) {
        this.allocatedsum = this.allocatedsum + this.investmentAllocates[i].allocatedAmount;
      }
    })
  }


 
  getColor(id) {
    switch (id) {
      case this.selectInvestmentId:
        return 'green';

      case !this.selectInvestmentId:
        return 'blue'
    }
  }


  deleteinvestmentallocate(financeId: number) {
    if (confirm("are you sure to delete?")) {
      this.investmentallocateService.deleteInvestmentallocate(this.selectInvestmentId, financeId, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one amount is allocated successfully", "INVESTMENT ALLOCATION");
        this.router.navigate(['/list_investment_allocate']);
      })
    }
  }
}

