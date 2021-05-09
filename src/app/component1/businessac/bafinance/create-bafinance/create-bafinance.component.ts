import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Businessacfinance } from './../../../../shared/model/businessacfinance';
import { BusinessacfinanceService } from './../../../../shared/services/businessacfinance.service';
import { Businessac } from './../../../../shared/model/businessac';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bafinance',
  templateUrl: './create-bafinance.component.html',
  styleUrls: ['./create-bafinance.component.css']
})
export class CreateBafinanceComponent implements OnInit {

  
  businessacs: Businessac[];
  businessacFile: string;
  selectBusinessacId: number;
  searchbusinessac: string;
  finance: any ={};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private businessacfinanceService: BusinessacfinanceService,
    private toastr: ToastrService, private router: Router) {
    this.businessacFile = this.businessacService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  
  ngOnInit() {
    this.getAllBusinessac();
  }


  getAllBusinessac() {
    this.businessacService.getAllBusinessac().subscribe(response => {
      this.businessacs = response;
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectBusinessacId:
        return 'green';
      case !this.selectBusinessacId:
        return 'blue'
    }
  }


  selectedBusinessac(businessacId: number) {
    this.selectBusinessacId = businessacId;
  }


  addBusinessacFinance(efinance: Businessacfinance) {
    this.businessacfinanceService.saveBusinessacFinance(this.selectBusinessacId, efinance, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is added successfully', 'TED BUSINESS ACELERATION');
      this.router.navigate(['/list_ba_finance'])
    })
  }
}
