import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Investmentfinance } from './../../../../shared/model/investmentfinance';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentfinanceService } from './../../../../shared/services/investmentfinance.service';
import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/shared/services/investment.service';

@Component({
  selector: 'app-updateinvestment-finance',
  templateUrl: './updateinvestment-finance.component.html',
  styleUrls: ['./updateinvestment-finance.component.css']
})
export class UpdateinvestmentFinanceComponent implements OnInit {

  investments: any = [];
  investmentfinances: any = [];
  investmentPicture: string;
  searchInvestment: string;
  selectedInvestmentId: number;
  id: number;
  data: Investmentfinance;
  ivfinanceId: number;
  exist: boolean = false;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private investmentfianceService: InvestmentfinanceService, 
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.investmentPicture = investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestments();
    this.getAllInvestFinances();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }




  getAllInvestments() {
    this.investmentService.getAllInvestments().subscribe(listinvestments => {
      this.investments = listinvestments;
    })
  }

  selectedInvestment(investId: number) {
    this.selectedInvestmentId = investId;
  }


  getColor(id) {
    switch (id) {
      case this.selectedInvestmentId:
        return 'green';

      case !this.selectedInvestmentId:
        return 'blue';
    }
  }


  getAllInvestFinances() {
    this.investmentfianceService.getAllInvestmentFinances().subscribe(listinvestfinances => {
      this.investmentfinances = listinvestfinances;
      for (var i = 0; i < this.investmentfinances.length; i++) {
        if (parseInt(this.investmentfinances[i].id) === this.id) {
          this.data = this.investmentfinances[i];
          this.ivfinanceId = parseInt(this.investmentfinances[i].id);
          this.exist = true;
        } else {
          this.exist = false;
        }
      }
    })
  }



  updateinvestmentfinance(data: any) {
    this.investmentfianceService.updateinvstmentfinance(this.selectedInvestmentId, this.ivfinanceId, this.data, this.loginAdmin.token).subscribe(response=>{
     this.toastr.success("one milestone is updated successfully", "INVESTMENT FINANCE");
     this.router.navigate(['/list_investment_finance']);
    })
  }




}
