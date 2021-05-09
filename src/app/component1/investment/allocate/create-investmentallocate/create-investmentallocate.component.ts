import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Investmentallocate } from './../../../../shared/model/investmentallocate';
import { Investment } from './../../../../shared/model/investment';
import { FormGroup } from '@angular/forms';
import { InvestmentallocateService } from './../../../../shared/services/investmentallocate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentService } from './../../../../shared/services/investment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-investmentallocate',
  templateUrl: './create-investmentallocate.component.html',
  styleUrls: ['./create-investmentallocate.component.css']
})
export class CreateInvestmentallocateComponent implements OnInit {

  investmentCategoryForm: FormGroup;
  investments: Investment[];
  investmentFile: string;
  selectInvestmentId: number;
  searchInvestment: string;
  public finance: any = {};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private investmentallocateService: InvestmentallocateService,
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


  addInvestmentAllocate(investmentallocate: Investmentallocate) {
    this.investmentallocateService.saveInvestmentAllocate(this.selectInvestmentId, investmentallocate, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is allocated successfully', 'INVESTMENT ALLOCATION');
      this.router.navigate(['/list_investment_allocate'])
    })
  }


 
}
