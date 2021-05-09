import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Ehub } from './../../../shared/model/ehub';
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { EhubService } from './../../../shared/services/ehub.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-ehub',
  templateUrl: './list-ehub.component.html',
  styleUrls: ['./list-ehub.component.css']
})
export class ListEhubComponent implements OnInit {
dtOptions: DataTables.Settings ={};
dtTrigger: Subject<any> =new Subject();
@ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;

ehubs$: Observable<Ehub[]>;
ehubs: Ehub[];

ehubFile: string;
loginAdmin:any ={};
constructor(private authService: AuthenticationService,private chRef: ChangeDetectorRef, private ehubService: EhubService, private router: Router) {
  this.ehubFile = this.ehubService.IMAGE_URL;
  this.authService.isLoggedIn();
  this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [0, 'desc']
    }


    this.ehubs$ =this.ehubService.getAllEhubs();
    this.ehubs$.subscribe(listEhub=>{
      this.ehubs = listEhub;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }

  
  deleteEhub(id: any){
    if (confirm("Are you sure to delete?")) {
      return this.ehubService.deleteehub(id, this.loginAdmin.token).subscribe(result=>{
        this.ehubService.clearCache();
        this.ehubs$=this.ehubService.getAllEhubs();
        this.ehubs$.subscribe(newList=>{
          this.ehubs =newList;
          this.rerender();
        })
        this.router.navigate(['/list_ehub']);
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
