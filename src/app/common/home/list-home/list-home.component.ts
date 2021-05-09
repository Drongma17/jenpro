import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ApplicationService } from './../../../shared/services/application.service';
import { Application } from './../../../shared/model/application';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.css']
})
export class ListHomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;


  public IMAGE_URL: string;
  applicants$: Observable<Application[]>;
  applicants: Application[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private service: ApplicationService,
    private router: Router, private chRef: ChangeDetectorRef) {
    this.IMAGE_URL = service.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
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
    this.applicants$ = this.service.getAllApplicantions();
    this.applicants$.subscribe(result => {
      this.applicants = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }




  deleteapplicant(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.service.deleteApplicant(id, this.loginAdmin.token).subscribe(result => {
        this.service.clearCache();
        this.applicants$ = this.service.getAllApplicantions();
        this.applicants$.subscribe(newList => {
          this.applicants = newList;
          this.rerender();
        })
        this.router.navigate(['/home'])
      })
    }
  }



  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}

