import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Snowbank } from './../../model/snowbank';
import { Observable } from 'rxjs';
import { Returnmoney } from './../../model/returnmoney';
import { ReturnmoneyService } from './../../service/returnmoney.service';
import { SnowbankService } from './../../service/snowbank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-returnmoney',
  templateUrl: './list-returnmoney.component.html',
  styleUrls: ['./list-returnmoney.component.css']
})
export class ListReturnmoneyComponent implements OnInit {

  returnmoneys: Returnmoney[];
  returnmoneys$: Observable<Returnmoney[]>;
  snowbankPicture: string;
  grandTotal: number;
  totalLended: number;
  selectedSnowbankId: number;
  snowbank: Snowbank;
  allocatedDate: any;
  searchsnowbank: string;
  snowbanks: any = [];
  constructor(private returnmoneyService: ReturnmoneyService, private snowbankService: SnowbankService,
    private toastr: ToastrService, private router: Router) {
    this.snowbankPicture = snowbankService.IMAGE_URL;
  }

  


  ngOnInit() {
    this.getAllSnowbanks();
    this.getReturnMoneyOfSnowbank(this.selectedSnowbankId);
  }

  getAllSnowbanks() {
    this.snowbankService.getAllSnowbanks().subscribe(response => {
      this.snowbanks = response;
    })
  }


 


  getReturnMoneyOfSnowbank(snowbankId: number) {
    this.selectedSnowbankId = snowbankId;
    this.snowbankService.getSnowbank(snowbankId).subscribe(resp => {
      this.snowbank = resp;
      this.totalLended = this.snowbank.lendAmount;
      this.allocatedDate = this.snowbank.returnDate;
    })
    this.returnmoneyService.clearCache();
    this.returnmoneys$ = this.returnmoneyService.getReutnMoneyOfSnowbank(this.selectedSnowbankId)
    this.returnmoneys$.subscribe(result => {
      this.returnmoneys = result;
      this.grandTotal = 0
      for (var i = 0; i < this.returnmoneys.length; i++) {
        this.grandTotal = this.grandTotal + this.returnmoneys[i].returnAmount;
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



  deletereturnMoney(returnmoneyId: number) {
  if(confirm("are you sure to delete?")){
    this.returnmoneyService.deleteReturnmoneyOfSnowbank(this.selectedSnowbankId, returnmoneyId).subscribe(response=>{
      this.toastr.success("one milestone is deleted", "PRE-INCUBATION FINANCE");
      this.router.navigate(['/list_fiance']);
    })
  }
  }
}
