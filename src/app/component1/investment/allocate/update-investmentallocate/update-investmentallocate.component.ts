import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Investmentallocate } from './../../../../shared/model/investmentallocate';
import { InvestmentallocateService } from './../../../../shared/services/investmentallocate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentService } from './../../../../shared/services/investment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-investmentallocate',
  templateUrl: './update-investmentallocate.component.html',
  styleUrls: ['./update-investmentallocate.component.css']
})
export class UpdateInvestmentallocateComponent implements OnInit {
  investments: any = [];
  investmentallocates: any = [];
  investmentPicture: string;
  searchInvestment: string;
  selectedInvestmentId: number;
  id: number;
  data: Investmentallocate;
  ivfinanceId: number;
  exist: boolean = false;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private investmentallocateService: InvestmentallocateService, 
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.investmentPicture = investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestments();
    this.getAllInvestAllocates();
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


  getAllInvestAllocates() {
    this.investmentallocateService.getAllInvestmentAllocate().subscribe(listinvestfinances => {
      this.investmentallocates = listinvestfinances;
      for (var i = 0; i < this.investmentallocates.length; i++) {
        if (parseInt(this.investmentallocates[i].id) === this.id) {
          this.data = this.investmentallocates[i];
          this.ivfinanceId = parseInt(this.investmentallocates[i].id);
          this.exist = true;
        } else {
          this.exist = false;
        }
      }
    })
  }



  updateinvestmentallocate(data: any) {
    this.investmentallocateService.updateInvestmentAllocate(this.selectedInvestmentId, this.ivfinanceId, this.data, this.loginAdmin.token).subscribe(response=>{
     this.toastr.success("one milestone is updated successfully", "INVESTMENT ALLOCATE");
     this.router.navigate(['/list_investment_allocate']);
    })
  }




}
