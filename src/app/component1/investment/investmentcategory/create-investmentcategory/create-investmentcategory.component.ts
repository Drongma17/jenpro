import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Observable } from 'rxjs';
import { Investmentcategory } from './../../../../shared/model/investmentcategory';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/shared/services/investment.service';
import { ToastrService } from 'ngx-toastr';
import { InvestmentcategoryService } from './../../../../shared/services/investmentcategory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-investmentcategory',
  templateUrl: './create-investmentcategory.component.html',
  styleUrls: ['./create-investmentcategory.component.css']
})
export class CreateInvestmentcategoryComponent implements OnInit {

  investmentcategoryForm: FormGroup;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private formBuider: FormBuilder, private investmentcategoryService: InvestmentcategoryService,
    private router: Router, private toastr: ToastrService, private investmentService: InvestmentService) {
     this.authService.isLoggedIn();
     this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      this.investmentcategoryForm = this.formBuider.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    })
  }

  ngOnInit() {
    this.listCategory();
  }



  saveInvestmentCategory(submitForm: FormGroup) {
    if (submitForm.valid) {
      const submitCategory = submitForm.value;
      const categoryData = new FormData();
      categoryData.append('investmentCategory', JSON.stringify(submitCategory))
      this.investmentcategoryService.addInvestmentCategory(categoryData, this.loginAdmin.token).subscribe(result => {
        this.toastr.success("new category created successfully", "INVESTMENT CATEGORY");
        this.router.navigate(['/create_investment']);
      });
    }
  }

  listinvestmentCategories$: Observable<Investmentcategory[]>;
  investmentcategories: Investmentcategory[];
  listCategory() {
    this.listinvestmentCategories$ = this.investmentcategoryService.getInvestmentCategories();
    this.listinvestmentCategories$.subscribe(categoryList => {
      this.investmentcategories = categoryList;
    })
  }

}
