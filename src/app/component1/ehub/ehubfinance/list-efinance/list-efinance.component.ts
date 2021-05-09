import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EhubfinanceService } from './../../../../shared/services/ehubfinance.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Ehub, Ehubfinance } from 'src/app/shared/model/ehub';
import { EhubService } from 'src/app/shared/services/ehub.service';

@Component({
  selector: 'app-list-efinance',
  templateUrl: './list-efinance.component.html',
  styleUrls: ['./list-efinance.component.css']
})
export class ListEfinanceComponent implements OnInit {


  searchehub: string;
  ehubs: Ehub[];
  ehub: Ehub;
  ehubPicture: string;
  selectehubId: number;
  allocatedAmount: number;
  allocatedDate: any;
  ehubfinances$: Observable<Ehubfinance[]>;
  ehubfinances: Ehubfinance[];
  grandTotal: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private ehubfinanceService: EhubfinanceService, private toastr: ToastrService, private router: Router) {
    this.ehubPicture = ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllEhubs();
  }

  getAllEhubs() {
    this.ehubService.getAllEhubs().subscribe(response => {
      this.ehubs = response;
    })
  }



  getFinanceOfEhub(ehubId: number) {
    this.selectehubId = ehubId;
    this.ehubService.getEhub(ehubId).subscribe(response => {
      this.ehub = response;
      this.allocatedAmount = this.ehub.allocatedAmount;
      this.allocatedDate = this.ehub.allocateDate;
    })
    this.ehubfinanceService.clearcash();
    this.ehubfinances$ = this.ehubfinanceService.getAllFinanceOfEhub(this.selectehubId);
    this.ehubfinances$.subscribe(responose => {
      this.ehubfinances = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.ehubfinances.length; i++) {
        this.grandTotal = this.grandTotal + this.ehubfinances[i].disburseAmount;
      }
    })
  }




  hideform = false;
  getColor(id) {
    switch (id) {
      case this.selectehubId:
        this.hideform = true;
        return 'green';
      case !this.selectehubId:
        return 'blue'
    }
  }



  deleteehubfinance(ehubfinanceId: number) {
    if (confirm("are you sure want to delete ?")) {
      this.ehubfinanceService.deleteEhubFinance(this.selectehubId, ehubfinanceId, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one ehub milestone is deleted successfully", " EHUB FINANCE");
        this.router.navigate(['/list_ehub_finance']);
      })
    }
  }
}
