import { SbcategoryService } from './../../service/sbcategory.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sbcategory } from './../../model/sbcategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-sbcategory',
  templateUrl: './list-sbcategory.component.html',
  styleUrls: ['./list-sbcategory.component.css']
})
export class ListSbcategoryComponent implements OnInit {

  sbcategories$: Observable<Sbcategory[]>
  sbcategories: any=[];
  loginAdmin : any=[];
  constructor(private authService: AuthenticationService,private sbCategoryService: SbcategoryService, private router: Router) { 
   this.authService.isLoggedIn();
   this.loginAdmin =JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnInit() {
   this.getsbCategories();
  }


  getsbCategories(){
    this.sbCategoryService.clearCache();
    this.sbcategories$= this.sbCategoryService.getAllCategories()
    this.sbcategories$.subscribe(result=>{
      this.sbcategories=result;
    })
  }


  deleteSbCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.sbCategoryService.deleteSbcategory(id, this.loginAdmin.token).subscribe(result=>
        {
          this.sbCategoryService.clearCache();
          this.sbcategories$=this.sbCategoryService.getAllCategories();
          this.sbcategories$.subscribe(newList=>
            {
              this.sbcategories=newList;
            })
            this.router.navigate(['/list_snowbank'])
        })
    }
  }


}
