import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Investmentfinance } from './../../../../shared/model/investmentfinance';
import { InvestmentfinanceService } from './../../../../shared/services/investmentfinance.service';
import { Investment } from './../../../../shared/model/investment';
import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/shared/services/investment.service';

@Component({
  selector: 'app-listinvestment-finance',
  templateUrl: './listinvestment-finance.component.html',
  styleUrls: ['./listinvestment-finance.component.css']
})
export class ListinvestmentFinanceComponent implements OnInit {
  searchinvestment: string;
  investments: Investment[];
  investment: Investment;
  investmentPicture: string;
  selectInvestmentId: number;
  allocatedAmount: number;
  allocatedDate: any;
  investmentFinances$: Observable<Investmentfinance[]>;
  investmentFinances: Investmentfinance[];
  grandTotal: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private investmentfinanceService: InvestmentfinanceService,
    private toastr: ToastrService, private router: Router) {
    this.investmentPicture = investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestment();
    this.getInvestmentfinances();
  }

  getAllInvestment() {
    this.investmentService.getAllInvestments().subscribe(response => {
      this.investments = response;
    })
  }


 getInvestmentfinances(){
  this.investmentfinanceService.getAllInvestmentFinances().subscribe(response => {
    this.investmentFinances = response;
  })
 }

  getFinanceOfInvestment(investmentId: number) {
    this.selectInvestmentId = investmentId;
    this.investmentService.getInvestment(investmentId).subscribe(response => {
      this.investment = response;
      this.allocatedAmount = this.investment.allocatedAmount;
      this.allocatedDate = this.investment.allocateDate;
    })
    this.investmentfinanceService.clearcash();
    this.investmentFinances$ = this.investmentfinanceService.getFinanceOfInvestment(this.selectInvestmentId);
    this.investmentFinances$.subscribe(responose => {
      this.investmentFinances = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.investmentFinances.length; i++) {
        this.grandTotal = this.grandTotal + this.investmentFinances[i].disburseAmount;
      }
    })
  }




  hideform = false;
  getColor(id) {
    switch (id) {
      case this.selectInvestmentId:
        this.hideform = true;
        return 'green';
      case !this.selectInvestmentId:
        return 'blue'
    }
  }


  deleteinvestmentfiance(financeId: number) {
    if (confirm("are you sure to delete?")) {
      this.investmentfinanceService.deleteinvstmentfinance(this.selectInvestmentId, financeId, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one milestone is deleted successfully", "INVESTMENT FINANCE");
        this.investmentfinanceService.clearcash();
        this.router.navigate(['/list_investment']);
      })
    }
  }
}
