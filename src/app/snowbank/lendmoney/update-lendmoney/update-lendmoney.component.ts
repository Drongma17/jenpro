import { Lendmoney } from './../../model/lendmoney';
import { SnowbankService } from './../../service/snowbank.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LendmoneyService } from './../../service/lendmoney.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-lendmoney',
  templateUrl: './update-lendmoney.component.html',
  styleUrls: ['./update-lendmoney.component.css']
})
export class UpdateLendmoneyComponent implements OnInit {

  snowbanks: any = [];
  snowbankPicture: string;
  searchsnowbank: string;
  snowbankId: number;
  Lendmoney: any = [];
  id: number;
  data: Lendmoney;
  exist: boolean = false;
  lendmoneyId: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private snowbankService: SnowbankService, private lendmoneyService: LendmoneyService,
     private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.snowbankPicture = snowbankService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllSnowbanks();
    this.getAllLendMoney();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }



  getAllSnowbanks() {
    this.snowbankService.getAllSnowbanks().subscribe(listba => {
      this.snowbanks = listba;
    })
  }


  getColor(id) {
    switch (id) {
      case this.snowbankId:
        return 'green';

      case !this.snowbankId:
        return 'blue';
    }
  }

  selectedSnowbank(selectedsnowbank: number) {
    this.snowbankId = selectedsnowbank;
  }


  getAllLendMoney() {
    this.lendmoneyService.getAllLendmoney().subscribe(listfinances => {
      this.Lendmoney = listfinances;
      for (var i = 0; i < this.Lendmoney.length; i++) {
        if (parseInt(this.Lendmoney[i].id) === this.id) {
          this.exist = true;
          this.data = this.Lendmoney[i];
          this.lendmoneyId = parseInt(this.Lendmoney[i].id);
        }
      }
    })
  }


  
updateLendmoney(data:any){
  this.lendmoneyService.updateLendmoney(this.snowbankId, this.lendmoneyId, this.data, this.loginAdmin.token).subscribe(response=>{
  this.toastr.success("one lendmoney of snowbank is updated successfully", "SNOW BANK");
  this.router.navigate(['/list_lendmoney_snowbank']);
  })
}

}
