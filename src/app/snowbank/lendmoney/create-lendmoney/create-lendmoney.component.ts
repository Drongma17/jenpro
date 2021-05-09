import { LendmoneyService } from './../../service/lendmoney.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Snowbank } from './../../model/snowbank';
import { FormGroup } from '@angular/forms';
import { SnowbankService } from './../../service/snowbank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-lendmoney',
  templateUrl: './create-lendmoney.component.html',
  styleUrls: ['./create-lendmoney.component.css']
})
export class CreateLendmoneyComponent implements OnInit {

  snowbankreactiveForm: FormGroup;
  snowbanks: Snowbank[];
  snowbankFile: string;
  selectedSnowbankId: number;
  searchSnowbank: string;
  public money: any = {};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private snowbankService: SnowbankService, private lendmoneyService: LendmoneyService,
    private toastr: ToastrService, private router: Router) {
    this.snowbankFile = this.snowbankService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllSnowbank();
  }


  getAllSnowbank() {
    this.snowbankService.getAllSnowbanks().subscribe(response => {
      this.snowbanks = response;
      console.log(response)
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


  selectedSnowbank(ehubId: number) {
    this.selectedSnowbankId = ehubId;
  }


  addLendmoneyToSnowbank(lendmoney: any, financeForm: any) {
    this.lendmoneyService.saveLendmoneyToSnowBank(this.selectedSnowbankId, lendmoney, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the money is lended  successfully', 'SNOW BANK');
      this.router.navigate(['/list_lendmoney_snowbank'])
    })
  }
}
