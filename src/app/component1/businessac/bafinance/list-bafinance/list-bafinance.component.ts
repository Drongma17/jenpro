import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessacfinanceService } from './../../../../shared/services/businessacfinance.service';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Businessacfinance } from './../../../../shared/model/businessacfinance';
import { Observable } from 'rxjs';
import { Businessac } from './../../../../shared/model/businessac';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bafinance',
  templateUrl: './list-bafinance.component.html',
  styleUrls: ['./list-bafinance.component.css']
})
export class ListBafinanceComponent implements OnInit {

 
  
  searchbusinessac: string;
  businessacs: Businessac[];
  businessac: Businessac;
  businessacPicture: string;
  selectedbusinessacId: number;
  allocatedAmount: number;
  allocatedDate: any;
  businessacfinances$: Observable<Businessacfinance[]>;
  businessacfinances: Businessacfinance[];
  grandTotal: number;
  loginAdmin:any ={};
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private businessacfinanceService: BusinessacfinanceService, private toastr: ToastrService, private router: Router) {
    this.businessacPicture = businessacService.IMAGE_URL;
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



  getFinanceOfBusinessac(businessacId: number) {
    this.selectedbusinessacId = businessacId;
    this.businessacService.getBusinessac(businessacId).subscribe(response => {
      this.businessac = response;
      this.allocatedAmount = this.businessac.allocatedAmount;
      this.allocatedDate = this.businessac.allocateDate;
    })
    this.businessacfinanceService.clearcash();
     this.businessacfinances$= this.businessacfinanceService.getFinanceOfBusinessac(this.selectedbusinessacId);
     this.businessacfinances$.subscribe(responose => {
      this.businessacfinances = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.businessacfinances.length; i++) {
        this.grandTotal = this.grandTotal + this.businessacfinances[i].disburseAmount;
      }
    })
  }




  hideform = false;
  getColor(id) {
    switch (id) {
      case this.selectedbusinessacId:
        this.hideform = true;
        return 'green';
      case !this.selectedbusinessacId:
        return 'blue'
    }
  }


  deleteinvestmentfinance(baId:number){
   this.businessacfinanceService.deleteBAfinance(this.selectedbusinessacId, baId, this.loginAdmin.token).subscribe(response=>{
    this.toastr.success("one milestone is deleted successfully", "BA FINANCE");
    this.router.navigate(['/list_ba_finance'])
   })
  }
}
