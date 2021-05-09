import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Stecategory } from './../../../../shared/model/stecategory';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { SteService } from './../../../../shared/services/ste.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StecategoryService } from './../../../../shared/services/stecategory.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-stecategory',
  templateUrl: './create-stecategory.component.html',
  styleUrls: ['./create-stecategory.component.css']
})
export class CreateStecategoryComponent implements OnInit {

 
  stecategoryForm: FormGroup;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private formBuider: FormBuilder, private stecategoryService: StecategoryService,
    private router: Router, private toastr: ToastrService, private steService: SteService) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      this.stecategoryForm = this.formBuider.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    })
  }

  ngOnInit() {
    this.listCategory();
  }



  saveSteCategory(submitForm: FormGroup) {
    if (submitForm.valid) {
      const submitCategory = submitForm.value;
      const categoryData = new FormData();
      categoryData.append('stecategory', JSON.stringify(submitCategory))
      this.stecategoryService.addSteCategory(categoryData, this.loginAdmin.token).subscribe(result => {
        this.toastr.success("new ste category created successfully", "STE CATEGORY");
        this.router.navigate(['/create_ste']);
      });
    }
  }



  listSteCategories$: Observable<Stecategory[]>;
  listSteCategories: Stecategory[];
  listCategory() {
    this.listSteCategories$ = this.stecategoryService.getAllSteCategories();
    this.listSteCategories$.subscribe(categoryList => {
      this.listSteCategories = categoryList;
    })
  }

}
