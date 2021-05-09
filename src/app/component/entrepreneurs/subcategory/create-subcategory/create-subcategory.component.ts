import { Subcategory } from './../../../../shared/model/subcategory';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntrepreneursService } from './../../../../shared/services/entrepreneurs.service';
import { SubcategoryService } from './../../../../shared/services/subcategory.service';
import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {

  subcategoryForm: FormGroup;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private formBuider: FormBuilder,private subcategoryService: SubcategoryService,
    private router: Router, private toastr: ToastrService, private entrepreneurService: EntrepreneursService) { 
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
   this.subcategoryForm =this.formBuider.group({
    name: ['', Validators.required],
    description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
   })
  }

  ngOnInit() {
    this.listSubCategoryById(0);
  }


  
  saveSubCategory(submitForm: FormGroup){
    if(submitForm.valid){
      const submitCategory =submitForm.value;
    const categoryData = new FormData();
    categoryData.append('subcategory', JSON.stringify(submitCategory))
    this.subcategoryService.addSubCategory(categoryData, this.loginAdmin.token).subscribe(result => {
     this.toastr.success("sub category created successfully", "PRE-INCUBATION");
     this.entrepreneurService.refreshList();
      this.router.navigate(['/add_Entrepreneur']);
    });
  }
}



listsubCategories$: Observable<Subcategory[]>;
subcategorybyid: Subcategory[];
listSubCategoryById(id:number){
this.listsubCategories$=this.subcategoryService.getChildCategoryById(id);
this.listsubCategories$.subscribe(categoryList=>{
  this.subcategorybyid=categoryList;
})
}

}
