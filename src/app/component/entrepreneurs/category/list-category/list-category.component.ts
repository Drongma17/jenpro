import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Category } from './../../../../shared/model/category';
import { CategoryService } from './../../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories$: Observable<Category[]>
  categories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private categoryService: CategoryService, private router: Router) { 
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
   this.getCategories();
  }


  getCategories(){
    this.categoryService.clearCache();
    this.categories$= this.categoryService.getAllCategories()
    this.categories$.subscribe(result=>{
      this.categories=result;
    })
  }


  deleteCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.categoryService.deleteCategory(id, this.loginAdmin.token).subscribe(result=>
        {
          this.categoryService.clearCache();
          this.categories$=this.categoryService.getAllCategories();
          this.categories$.subscribe(newList=>
            {
              this.categories=newList;
            })
            this.router.navigate(['/list_Entrepreneur'])
        })
    }
  }


}
