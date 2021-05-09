import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Stefinance } from './../../../../shared/model/stefinance';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StefinanceService } from './../../../../shared/services/stefinance.service';
import { SteService } from './../../../../shared/services/ste.service';
import { Ste } from './../../../../shared/model/ste';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-stefinance',
  templateUrl: './create-stefinance.component.html',
  styleUrls: ['./create-stefinance.component.css']
})
export class CreateStefinanceComponent implements OnInit {

 
  stes: Ste[];
  steFile: string;
  selectSteId: number;
  searchste: string;
  public finance: any = {};
  loginAdmin:any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private stefinanceService: StefinanceService,
    private toastr: ToastrService, private router: Router) {
    this.steFile = this.steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
	
  }

  ngOnInit() {
    this.getAllStes();
  }


  getAllStes() {
    this.steService.getAllStes().subscribe(response => {
      this.stes = response;
      console.log(response)
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectSteId:
        return 'green';
      case !this.selectSteId:
        return 'blue'
    }
  }


  selectedSte(investmentId: number) {
    this.selectSteId = investmentId;
  }


  addSteFinance(stefinance: Stefinance) {
    this.stefinanceService.saveSteFinance(this.selectSteId, stefinance, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is added successfully', 'TED EHUB');
      this.router.navigate(['/list_ste_finance'])
    })
  }
}
