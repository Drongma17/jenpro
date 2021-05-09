import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Businessac } from './../../../shared/model/businessac';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-businessac',
  templateUrl: './list-businessac.component.html',
  styleUrls: ['./list-businessac.component.css']
})
export class ListBusinessacComponent implements OnInit {
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> =new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;
  
  businessacs$: Observable<Businessac[]>;
  businessacs: Businessac[];
  
  businessacFile: string;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private chRef: ChangeDetectorRef, private businessacService :BusinessacService, private router: Router) {
    this.businessacFile = this.businessacService.IMAGE_URL;
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
  
  
      this.businessacs$ =this.businessacService.getAllBusinessac();
      this.businessacs$.subscribe(listbusinessac=>{
        this.businessacs = listbusinessac;
        this.chRef.detectChanges();
        this.dtTrigger.next();
      })
    }
  
    
    deleteBusinessac(id: any){
      if (confirm("Are you sure to delete?")) {
        return this.businessacService.deleteBusinessac(id, this.loginAdmin.token).subscribe(result=>{
          this.businessacService.clearCache();
          this.businessacs$=this.businessacService.getAllBusinessac();
          this.businessacs$.subscribe(newList=>{
            this.businessacs =newList;
            this.rerender();
          })
          this.router.navigate(['/list_businessac']);
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
  