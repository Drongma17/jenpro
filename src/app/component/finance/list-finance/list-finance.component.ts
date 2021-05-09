import { ToastrService } from 'ngx-toastr';
import { EntrepreneursService } from './../../../shared/services/entrepreneurs.service';
import { Finance, Entrepreneurs } from './../../../shared/model/entrepreneurs';
import { FinanceService } from './../../../shared/services/finance.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { compilePipeFromMetadata, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-list-finance',
  templateUrl: './list-finance.component.html',
  styleUrls: ['./list-finance.component.css']
})
export class ListFinanceComponent implements OnInit {

  finances: Finance[];
  finances$: Observable<Finance[]>;
  entrepreneurPicture: string;
  grandTotal: number;
  allocatedAmount: number;
  selectedEntrepreneurId: number;
  entrepreneur: Entrepreneurs;
  allocatedDate: any;
  searchEntrepreneur: string;
  constructor(private financeService: FinanceService, private entrepreneurService: EntrepreneursService,
    private toastr: ToastrService, private router: Router) {
    this.entrepreneurPicture = entrepreneurService.IMAGE_URL;
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
    this.financeService.clearCache();
    this.finances$ = this.financeService.getFinanceOfEntrepreneur(this.selectedEntrepreneurId)
    this.finances$.subscribe(result => {
      this.finances = result;
      this.grandTotal = 0
      for (var i = 0; i < this.finances.length; i++) {
        this.grandTotal = this.grandTotal + this.finances[i].disburseAmount;
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



  deleteIncubationFinance(preincubationfinanceId: number) {
  if(confirm("are you sure to delete?")){
    this.financeService.deletefinanceofpreincubation(this.selectedEntrepreneurId, preincubationfinanceId).subscribe(response=>{
      this.toastr.success("one milestone is deleted", "PRE-INCUBATION FINANCE");
      this.router.navigate(['/list_fiance']);
    })
  }
  }
}
