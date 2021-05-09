import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from './../../../../shared/model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  categories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
  loginAdmin: any ={};
    constructor(private authService: AuthenticationService,private categoryService: CategoryService, 
      private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
        this.authService.isLoggedIn();
        this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
      
    this.route.params.subscribe(params=>{
      this.id =+params['id'];
    })
     

    this.categories$= this.categoryService.getAllCategories()
    this.categories$.subscribe(result=>{
      this.categories=result;
      for(var i=0; i<this.categories.length; i++){
        if(parseInt(this.categories[i].id) === this.id){
           this.exist =true;
           this.categoryObject =this.categories[i];
        }else{
          this.exist=false;
        }
      }
    })
  }


  updateCategory(){
    const categoryData = new FormData();
    categoryData.append('category', JSON.stringify(this.categoryObject))
    this.categoryService.addCategory(categoryData, this.loginAdmin.token).subscribe(result => {
      this.toastr.success("one category is updated successfully", "UPDATE CATEGORY");
      this.router.navigate(['/create_category']);
    });
  }


}
