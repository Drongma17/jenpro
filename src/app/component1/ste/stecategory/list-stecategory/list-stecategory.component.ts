import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { StecategoryService } from './../../../../shared/services/stecategory.service';
import { Stecategory } from './../../../../shared/model/stecategory';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-stecategory',
  templateUrl: './list-stecategory.component.html',
  styleUrls: ['./list-stecategory.component.css']
})
export class ListStecategoryComponent implements OnInit {

  
  
  stecategories$: Observable<Stecategory[]>
  stecategories: any=[];
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private stecategoryService: StecategoryService, private router: Router) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
   this.getSteCategories();
  }


  getSteCategories(){
    this.stecategoryService.clearCache();
    this.stecategories$= this.stecategoryService.getAllSteCategories()
    this.stecategories$.subscribe(result=>{
      this.stecategories=result;
    })
  }


  deleteSteCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.stecategoryService.deleteSteCategory(id, this.loginAdmin.token).subscribe(result=>
        {
          this.stecategoryService.clearCache();
          this.stecategories$=this.stecategoryService.getAllSteCategories();
          this.stecategories$.subscribe(newList=>
            {
              this.stecategories=newList;
            })
            this.router.navigate(['/list_ste_category'])
        })
    }
  }


}
