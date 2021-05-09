import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SteService } from './../../../../shared/services/ste.service';
import { StefinanceService } from './../../../../shared/services/stefinance.service';
import { Stefinance } from './../../../../shared/model/stefinance';
import { Observable } from 'rxjs';
import { Ste } from './../../../../shared/model/ste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-stefinance',
  templateUrl: './list-stefinance.component.html',
  styleUrls: ['./list-stefinance.component.css']
})
export class ListStefinanceComponent implements OnInit {

  searcheste: string;
  stes: Ste[];
  ste: Ste;
  stePicture: string;
  selectedsteId: number;
  allocatedAmount: number;
  allocatedDate: any;
  stefinances$: Observable<Stefinance[]>;
  stefinances: Stefinance[];
  grandTotal: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private stefinanceService: StefinanceService, private toastr: ToastrService, private router: Router) {
    this.stePicture = steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
	
  }

  ngOnInit() {
    this.getAllStes();
  }

  getAllStes() {
    this.steService.getAllStes().subscribe(response => {
      this.stes = response;
    })
  }



  getFinanceOfSte(ehubId: number) {
    this.selectedsteId = ehubId;
    this.steService.getSte(ehubId).subscribe(response => {
      this.ste = response;
      this.allocatedAmount = this.ste.allocatedAmount;
      this.allocatedDate = this.ste.allocateDate;
    })
    this.stefinanceService.clearcash();
    this.stefinances$ = this.stefinanceService.getFinanceOfSte(this.selectedsteId);
    this.stefinances$.subscribe(responose => {
      this.stefinances = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.stefinances.length; i++) {
        this.grandTotal = this.grandTotal + this.stefinances[i].disburseAmount;
      }
    })
  }




  hideform = false;
  getColor(id) {
    switch (id) {
      case this.selectedsteId:
        this.hideform = true;
        return 'green';
      case !this.selectedsteId:
        return 'blue'
    }
  }


  deletestefinance(stefinanceId: number) {
    if (confirm("are you sure to delete ?")) {
      this.stefinanceService.deletestefinance(this.selectedsteId, stefinanceId, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one milestone is deleted successfully", "STE FINANCE");
        this.router.navigate(['/list_ste_finance']);
      })
    }
  }
}
