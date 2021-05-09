import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Observable } from 'rxjs';
import { Bacategory } from './../../../../shared/model/bacategory';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BacategoryService } from './../../../../shared/services/bacategory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bacategory',
  templateUrl: './create-bacategory.component.html',
  styleUrls: ['./create-bacategory.component.css']
})
export class CreateBacategoryComponent implements OnInit {

  
  bacategoryForm: FormGroup;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private formBuider: FormBuilder, private bacategoryService: BacategoryService,
    private router: Router, private toastr: ToastrService, private businessacService: BusinessacService) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      this.bacategoryForm = this.formBuider.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    })
  }

  ngOnInit() {
    this.listCategory();
  }



  saveBAcategory(submitForm: FormGroup) {
    if (submitForm.valid) {
      const submitCategory = submitForm.value;
      const categoryData = new FormData();
      categoryData.append('bacategory', JSON.stringify(submitCategory))
      this.bacategoryService.addBacategory(categoryData, this.loginAdmin.token).subscribe(result => {
        this.toastr.success("new BA category created successfully", "ADD BA CATEGORY");
        this.businessacService.refreshList();
        this.router.navigate(['/create_businessac']);
      });
    }
  }



  listbacategories$: Observable<Bacategory[]>;
  listbacategories: Bacategory[];
  listCategory() {
    this.listbacategories$ = this.bacategoryService.getAllBacategories();
    this.listbacategories$.subscribe(categoryList => {
      this.listbacategories = categoryList;
    })
  }

}
