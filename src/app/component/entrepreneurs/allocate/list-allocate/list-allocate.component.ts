import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntrepreneursService } from './../../../../shared/services/entrepreneurs.service';
import { IncubationallotService } from './../../../../shared/services/incubationallot.service';
import { Entrepreneurs } from './../../../../shared/model/entrepreneurs';
import { Observable } from 'rxjs';
import { Incuallocate } from './../../../../shared/model/incuallocate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-allocate',
  templateUrl: './list-allocate.component.html',
  styleUrls: ['./list-allocate.component.css']
})
export class ListAllocateComponent implements OnInit {

  incubationallots: Incuallocate[];
  incubationallots$: Observable<Incuallocate[]>;
  entrepreneurPicture: string;
  allocatedsum: number;
  allocatedAmount: number;
  selectedEntrepreneurId: number;
  entrepreneur: Entrepreneurs;
  allocatedDate: any;
  searchEntrepreneur:string;
  longinAdmin: any={}
  constructor(private authService: AuthenticationService,private incubationallotService: IncubationallotService, private entrepreneurService: EntrepreneursService,
    private toastr: ToastrService, private router: Router) {
    this.entrepreneurPicture = entrepreneurService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.longinAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  preneurs: any = [];


  ngOnInit() {
    this.getAllEntrepreneurs();
    this.getFinanceOfEntrepreneur(this.selectedEntrepreneurId);
  }

  getAllEntrepreneurs() {
    this.entrepreneurService.getAllEntrepreneurs().subscribe(response => {
      this.preneurs = response;
    })
  }





  getFinanceOfEntrepreneur(entrepreneurId: number) {
    this.selectedEntrepreneurId = entrepreneurId;
    this.entrepreneurService.getEntrepreneur(entrepreneurId).subscribe(resp => {
      this.entrepreneur = resp;
      this.allocatedAmount = this.entrepreneur.allocatedAmount;
      this.allocatedDate = this.entrepreneur.allocateDate;
    })
    this.incubationallots$ = this.incubationallotService.getAllocationByIncubationId(this.selectedEntrepreneurId)
    this.incubationallots$.subscribe(result => {
      this.incubationallots = result;
      this.allocatedsum = 0;
      for (var i = 0; i < this.incubationallots.length; i++) {
        this.allocatedsum = this.allocatedsum + this.incubationallots[i].allocatedAmount;
      }
    })

  }




  getColor(id) {
    switch (id) {
      case this.selectedEntrepreneurId:
        return 'green';

      case !this.selectedEntrepreneurId:
        return 'blue'
    }
  }



  deleteIncubationallotFinance(preincubationfinanceId: number) {
    if (confirm("are you sure to delete?")) {
      this.incubationallotService.deletallocation(this.selectedEntrepreneurId, preincubationfinanceId, this.longinAdmin.token).subscribe(response => {
        this.toastr.success("one milestone is deleted", "PRE-INCUBATION ALLOCATE FINANCE");
        this.router.navigate(['/list_allocate_fiance']);
      })
    }
  }
}
