import { Snowbank } from './../../model/snowbank';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LendmoneyService } from './../../service/lendmoney.service';
import { SnowbankService } from './../../service/snowbank.service';
import { Observable } from 'rxjs';
import { Lendmoney } from './../../model/lendmoney';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-lendmoney',
  templateUrl: './list-lendmoney.component.html',
  styleUrls: ['./list-lendmoney.component.css']
})
export class ListLendmoneyComponent implements OnInit {

  
  searchSnowbank: string;
  snowbanks: Snowbank[];
  snowbank: Snowbank;
  snowbankPicture: string;
  selectedSnowbankId: number;
  allocatedAmount: number;
  allocatedDate: any;
  lendmoneys$: Observable<Lendmoney[]>;
  lendmoneys: Lendmoney[];
  grandTotal: number;
  loginAdmin: any ={}
  constructor(private authService: AuthenticationService,private snowbankService: SnowbankService, private lendmoneyService: LendmoneyService, private toastr: ToastrService, private router: Router) {
    this.snowbankPicture = snowbankService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllBusinessac();
  }

  getAllBusinessac() {
    this.snowbankService.getAllSnowbanks().subscribe(response => {
      this.snowbanks = response;
    })
  }



  getAllLendMoneyOfSnowbank(businessacId: number) {
    this.selectedSnowbankId = businessacId;
    this.snowbankService.getSnowbank(businessacId).subscribe(response => {
      this.snowbank = response;
      this.allocatedAmount = this.snowbank.lendAmount;
      this.allocatedDate = this.snowbank.lendDate;
    })

    this.lendmoneys$ = this.lendmoneyService.getAllLendmoneyBySnowbankId(this.selectedSnowbankId);
    this.lendmoneys$.subscribe(responose => {
      this.lendmoneys = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.lendmoneys.length; i++) {
        this.grandTotal = this.grandTotal + this.lendmoneys[i].lendAmount;
      }
    })
  }




  getColor(id) {
    switch (id) {
      case this.selectedSnowbankId:
        return 'green';

      case !this.selectedSnowbankId:
        return 'blue'
    }
  }


  deleteLendmoney(baId: number, formRefreshi: any) {
    if (confirm("are you sure to delete?")) {
      this.lendmoneyService.deleteLendmoney(this.selectedSnowbankId, baId, this.loginAdmin.token).subscribe(response => {
        formRefreshi.reset();
        this.router.navigate(['/list_lendmoney_snowbank'])
        this.toastr.success("one lend amound is deleted successfully", "SNOW BANK");
      })
    }
  }
}