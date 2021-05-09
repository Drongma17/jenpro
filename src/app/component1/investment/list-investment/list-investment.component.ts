import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { InvestmentService } from './../../../shared/services/investment.service';
import { Investment } from './../../../shared/model/investment';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-list-investment',
  templateUrl: './list-investment.component.html',
  styleUrls: ['./list-investment.component.css']
})
export class ListInvestmentComponent implements OnInit {

  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> =new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;
  
  investments$: Observable<Investment[]>;
  investments: Investment[];
  
  investmentFile: string;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private chRef: ChangeDetectorRef, private investmentService: InvestmentService, private router: Router) {
    this.investmentFile = this.investmentService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
     }
  
    ngOnInit() {
      this.dtOptions={
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        order: [0, 'desc']
      }
  
  
      this.investments$ =this.investmentService.getAllInvestments();
      this.investments$.subscribe(listInvestments=>{
        this.investments = listInvestments;
        this.chRef.detectChanges();
        this.dtTrigger.next();
      })
    }


   
    deletInvestment(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.investmentService.deleteinvestment(id, this.loginAdmin.token).subscribe(result=>
        {
          this.investmentService.clearCache();
          this.investments$=this.investmentService.getAllInvestments();
          this.investments$.subscribe(newList=>
            {
              this.investments=newList;
              this.rerender();
            })
            this.router.navigate(['/list_investment'])
        })
    }
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  
  ngOnDestroy() 
  {
      this.dtTrigger.unsubscribe();
  }
}
