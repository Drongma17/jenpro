import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Ste } from './../../../shared/model/ste';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SteService } from 'src/app/shared/services/ste.service';

@Component({
  selector: 'app-list-ste',
  templateUrl: './list-ste.component.html',
  styleUrls: ['./list-ste.component.css']
})
export class ListSteComponent implements OnInit {

  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> =new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;
  
  stes$: Observable<Ste[]>;
  stes: Ste[];
  
  steFile: string;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private chRef: ChangeDetectorRef, private steService: SteService, private router: Router) {
    this.steFile = this.steService.IMAGE_URL;
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
  
  
      this.stes$ =this.steService.getAllStes();
      this.stes$.subscribe(listInvestments=>{
        this.stes = listInvestments;
        this.chRef.detectChanges();
        this.dtTrigger.next();
      })
    }


   
    deleteste(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.steService.deleteSte(id, this.loginAdmin.token).subscribe(result=>
        {
          this.steService.clearCache();
          this.stes$=this.steService.getAllStes();
          this.stes$.subscribe(newList=>
            {
              this.stes=newList;
              this.rerender();
            })
            this.router.navigate(['/list_ste'])
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
