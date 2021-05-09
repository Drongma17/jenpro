import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Category } from './../../../shared/model/category';
import { CategoryService } from './../../../shared/services/category.service';
import { Router } from '@angular/router';
import { Entrepreneurs } from '../../../shared/model/entrepreneurs';
import { EntrepreneursService } from '../../../shared/services/entrepreneurs.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;

  
  public IMAGE_URL: string;
  entrepreneurs$: Observable<Entrepreneurs[]>;
  entrepreneurs: Entrepreneurs[];
  public categories: Category[];
  loginUser: any={}
  constructor(private authService: AuthenticationService ,private service: EntrepreneursService, private categoryService: CategoryService,
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
    this.entrepreneurs$ = this.service.getAllEntrepreneurs();
    this.entrepreneurs$.subscribe(result => {
      this.entrepreneurs = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }




  deleteentrepreneur(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.service.deleteentrepreneur(id, this.loginUser.token).subscribe(result=>
        {
          this.service.clearCache();
          this.entrepreneurs$=this.service.getAllEntrepreneurs();
          this.entrepreneurs$.subscribe(newList=>
            {
              this.entrepreneurs=newList;
              this.rerender();
            })
            this.service.refreshList();
            this.router.navigate(['/list_Entrepreneur'])
        })
    }
  }

  getCategories(){
    return this.categoryService.getAllCategories().subscribe(response=>{
      this.categories =response;
    })
   }
   

  ngOnDestroy() 
  {
      // Do not forget to unsubscribe
      this.dtTrigger.unsubscribe();
  }
}

