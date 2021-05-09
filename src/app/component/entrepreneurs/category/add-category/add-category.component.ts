import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Category } from './../../../../shared/model/category';
import { Observable } from 'rxjs';
import { EntrepreneursService } from './../../../../shared/services/entrepreneurs.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from './../../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  loginAdmin: any = {};
  constructor(private authService: AuthenticationService, private formBuider: FormBuilder, private categoryService: CategoryService,
    private router: Router, private toastr: ToastrService, private entrepreneurService: EntrepreneursService) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
    this.categoryForm = this.formBuider.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    })
  }

  ngOnInit() {
    this.listCategory();
  }



  saveCategory(submitForm: FormGroup) {
    if (submitForm.valid) {
      const submitCategory = submitForm.value;
      const categoryData = new FormData();
      categoryData.append('category', JSON.stringify(submitCategory))
      this.categoryService.addCategory(categoryData, this.loginAdmin.token).subscribe(result => {
        this.toastr.success("new category created successfully", "ADD CATEGORY");
        this.entrepreneurService.refreshList();
        this.router.navigate(['/add_pre_incubation']);
      });
    }
  }

  listCategories$: Observable<Category[]>;
  categories: Category[];
  listCategory() {
    this.listCategories$ = this.categoryService.getAllCategories();
    this.listCategories$.subscribe(categoryList => {
      this.categories = categoryList
    })
  }


}
