import { SbcategoryService } from './../../service/sbcategory.service';
import { Observable } from 'rxjs';
import { Sbcategory } from './../../model/sbcategory';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { SnowbankService } from './../../service/snowbank.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-sbcategory',
  templateUrl: './create-sbcategory.component.html',
  styleUrls: ['./create-sbcategory.component.css']
})
export class CreateSbcategoryComponent implements OnInit {

  categoryForm: FormGroup;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private formBuider: FormBuilder,private categoryService: SbcategoryService,
    private router: Router, private toastr: ToastrService, private snowbankService: SnowbankService) { 
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
   this.categoryForm =this.formBuider.group({
    categoryName: ['', Validators.required],
    categoryDescription: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
   })
  }

  ngOnInit() {
    this.listCategory();
  }


  
  saveCategory(submitForm: FormGroup){
    if(submitForm.valid){
      const submitCategory =submitForm.value;
    const categoryData = new FormData();
    categoryData.append('category', JSON.stringify(submitCategory))
    this.categoryService.addSbcategory(categoryData, this.loginAdmin.token).subscribe(result => {
     this.toastr.success("new category created successfully", "ADD CATEGORY");
     this.snowbankService.refreshList();
      this.router.navigate(['/create_snowbank']);
    });
  }
}

listCategories$: Observable<Sbcategory[]>;
categories: Sbcategory[];
listCategory(){
this.listCategories$=this.categoryService.getAllCategories();
this.listCategories$.subscribe(categoryList=>{
  this.categories=categoryList;
})
}

}
