import { AuthenticationService } from './../../../shared/services/authentication.service';
import { BacategoryService } from './../../../shared/services/bacategory.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-businessac',
  templateUrl: './create-businessac.component.html',
  styleUrls: ['./create-businessac.component.css']
})
export class CreateBusinessacComponent implements OnInit {

  businessacReactiveForm: FormGroup;
  businessacFile: File;
  bacategories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private build: FormBuilder, private businessacService: BusinessacService,private bacategoryService: BacategoryService, private toatr: ToastrService, private router: Router) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
    this.businessacReactiveForm=this.build.group({
      id: new FormControl(''),
      title: new FormControl(''),
      businessacName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      baCategoryName: new FormControl('',[Validators.required]),
      batch: new FormControl(''),
      allocatedAmount: new FormControl(''),
      allocateDate: new FormControl(''),
      totalDisbursed: new FormControl(''),
      businessName: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      briefIntroduction: new FormControl(''),
      about: new FormControl(''),
      fileName: new FormControl(''),
    })
   }


   onSelectFile(event){
    const file= event.target.files[0];
    this.businessacFile =file;
   }

  ngOnInit() {
    this.bacategories = this.bacategoryService.getAllBacategories();
  }



  saveBusinessac(formSubmit: FormGroup){
    if(formSubmit.valid){
      const businessacValue=formSubmit.value;
      const formData =new FormData();
      formData.append('file', this.businessacFile);
      formData.append('businessac', JSON.stringify(businessacValue));
      this.businessacService.clearCache();
      return this.businessacService.saveBusinessacProfile(formData, this.loginAdmin.token).subscribe(response=>{
       this.toatr.success("bussinessac is saved successfully", "TED BUSINESS ACCELERATION");
       this.router.navigate(['/list_businessac']);
      })
    }
    this.validateFormFields(formSubmit);
  }


  validateFormFields(submitForm: FormGroup){
    Object.keys(submitForm.controls).forEach(field=>{
      const control =submitForm.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateFormFields(control);
      }
    })
  }


}
