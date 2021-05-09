import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Investmentfinance } from './../../../../shared/model/investmentfinance';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvestmentfinanceService } from './../../../../shared/services/investmentfinance.service';
import { Investment } from './../../../../shared/model/investment';
import { InvestmentService } from './../../../../shared/services/investment.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-createinvestment-finance',
  templateUrl: './createinvestment-finance.component.html',
  styleUrls: ['./createinvestment-finance.component.css']
})
export class CreateinvestmentFinanceComponent implements OnInit {

  investmentCategoryForm: FormGroup;
  investments: Investment[];
  investmentFile: string;
  selectInvestmentId: number;
  searchInvestment: string;
  public finance: any = {};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private investmentFinanceService: InvestmentfinanceService,
    private toastr: ToastrService, private router: Router) {
    this.investmentFile = this.investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestments();
  }


  getAllInvestments() {
    this.investmentService.getAllInvestments().subscribe(response => {
      this.investments = response;
      console.log(response)
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


  selectedInvestment(investmentId: number) {
    this.selectInvestmentId = investmentId;
  }


  addInvestmentFinance(finance: Investmentfinance) {
    this.investmentFinanceService.saveInvestmentFinance(this.selectInvestmentId, finance, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is added successfully', 'TED INVESTMENT');
      this.router.navigate(['/list_investment_finance'])
    })
  }


 
}
