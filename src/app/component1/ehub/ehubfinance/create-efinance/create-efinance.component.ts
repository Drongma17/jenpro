import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Ehubfinance } from './../../../../shared/model/ehub';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EhubfinanceService } from './../../../../shared/services/ehubfinance.service';
import { EhubService } from './../../../../shared/services/ehub.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ehub } from '../../../../shared/model/ehub';

@Component({
  selector: 'app-create-efinance',
  templateUrl: './create-efinance.component.html',
  styleUrls: ['./create-efinance.component.css']
})
export class CreateEfinanceComponent implements OnInit {

  ehubreactiveForm: FormGroup;
  ehubs: Ehub[];
  ehubFile: string;
  selectEhubId: number;
  searchEhub: string;
  public finance: any = {};
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private ehubfinanceService: EhubfinanceService,
    private toastr: ToastrService, private router: Router) {
    this.ehubFile = this.ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestments();
  }


  getAllInvestments() {
    this.ehubService.getAllEhubs().subscribe(response => {
      this.ehubs = response;
      console.log(response)
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectEhubId:
        return 'green';
      case !this.selectEhubId:
        return 'blue'
    }
  }


  selectedehub(ehubId: number) {
    this.selectEhubId = ehubId;
  }


  addEhubFinance(efinance: Ehubfinance) {
    this.ehubfinanceService.saveEhubFinance(this.selectEhubId, efinance, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is added successfully', 'TED EHUB');
      this.router.navigate(['/list_ehub_finance'])
    })
  }
}
