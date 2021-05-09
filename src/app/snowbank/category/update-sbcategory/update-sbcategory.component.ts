import { ToastrService } from 'ngx-toastr';
import { SbcategoryService } from './../../service/sbcategory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Observable } from 'rxjs';
import { Sbcategory } from './../../model/sbcategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-sbcategory',
  templateUrl: './update-sbcategory.component.html',
  styleUrls: ['./update-sbcategory.component.css']
})
export class UpdateSbcategoryComponent implements OnInit {

  categories$: Observable<Sbcategory[]>;
  categories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
  loginAdmin: any ={};
    constructor(private authService: AuthenticationService,private categoryService: SbcategoryService, 
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
    this.categoryService.addSbcategory(categoryData, this.loginAdmin.token).subscribe(result => {
      this.toastr.success("one category is updated successfully", "SNOW BANK");
      this.router.navigate(['/create_snowbank_category']);
    });
  }


}
