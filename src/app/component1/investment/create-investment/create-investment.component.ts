import { AuthenticationService } from './../../../shared/services/authentication.service';
import { InvestmentcategoryService } from './../../../shared/services/investmentcategory.service';
import { InvestmentService } from './../../../shared/services/investment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-investment',
  templateUrl: './create-investment.component.html',
  styleUrls: ['./create-investment.component.css']
})
export class CreateInvestmentComponent implements OnInit {

  investmentReactiveForm: FormGroup;
  investmentFile: string;
  investmentcategories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private investmentService: InvestmentService, private builder: FormBuilder, private toaster: ToastrService,
     private router: Router, private investmentcategoryService: InvestmentcategoryService) {
     this.authService.isLoggedIn();
     this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      this.investmentReactiveForm = this.builder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      investmentName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      batch: new FormControl(''),
      allocatedAmount: new FormControl(''),
      allocateDate: new FormControl(''),
      totalDisbursed: new FormControl(''),
      businessName: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      briefIntroduction: new FormControl(''),
      about: new FormControl(''),
      investmentCategory: new FormControl(''),
      fileName: new FormControl(''),
    })
  }

  ngOnInit() {
    this.investmentcategories = this.investmentcategoryService.getInvestmentCategories();
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.investmentFile = file;
  }

  saveInvestment(submitForm: FormGroup) {
    if (submitForm.valid) {
      const investment = submitForm.value;
      const formData = new FormData();
      formData.append('investment', JSON.stringify(investment));
      formData.append('file', this.investmentFile);
      this.investmentService.clearCache();
      this.investmentService.saveInvestmentProfile(formData, this.loginAdmin.token).subscribe(response => {
        this.toaster.success("one person is added successfully", "TED INVESTMENT!");
        this.router.navigate(['/list_investment']);
      })
    }
    this.validateFormFields(submitForm);
  }

  validateFormFields(submitForm: FormGroup) {
    Object.keys(submitForm.controls).forEach(field => {
      const control = submitForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    })
  }
}
