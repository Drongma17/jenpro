import { SnowbankService } from './../../service/snowbank.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Snowbank } from './../../model/snowbank';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;

  
  public IMAGE_URL: string;
  snowbanks$: Observable<Snowbank[]>;
  snowbanks: Snowbank[];
  loginUser: any={}
  constructor(private authService: AuthenticationService ,private service: SnowbankService, 
    private router: Router, private chRef: ChangeDetectorRef) {
    this.IMAGE_URL = service.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
  }



  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.snowbanks$ = this.service.getAllSnowbanks();
    this.snowbanks$.subscribe(result => {
      this.snowbanks = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }




  deletesnowbank(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.service.deleteSnowbank(id, this.loginUser.token).subscribe(result=>
        {
          this.service.clearCache();
          this.snowbanks$=this.service.getAllSnowbanks();
          this.snowbanks$.subscribe(newList=>
            {
              this.snowbanks=newList;
              this.rerender();
            })
            this.service.refreshList();
            this.router.navigate(['/list_lendmoney_snowbank'])
        })
    }
  }

 
   

  ngOnDestroy() 
  {
      // Do not forget to unsubscribe
      this.dtTrigger.unsubscribe();
  }
}

