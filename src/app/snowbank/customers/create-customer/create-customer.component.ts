import { SbcategoryService } from './../../service/sbcategory.service';
import { Observable } from 'rxjs';
import { Sbcategory } from './../../model/sbcategory';
import { SnowbankService } from './../../service/snowbank.service';
import { Snowbank } from './../../model/snowbank';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IAlert } from './../../../shared/model/IAlert';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  public snowbankReactiveForm: FormGroup;
  public snowbankFile : File;
  public alerts: Array<IAlert> = [];
  private snowbanks$ : Snowbank[];
  public categories: any=[];
  public loginUser: any={}
 constructor(private authService: AuthenticationService,  private snowbankService: SnowbankService, private formBuilder : FormBuilder,
   private router: Router, private toastr: ToastrService, private sbCategoryService: SbcategoryService) { 
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'))

   this.snowbankReactiveForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      customerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
     email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
     phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
     gender:  new FormControl(''),
     lendAmount: new FormControl(''),
     accountHolderName: new FormControl(''),
     accountNumber: new FormControl(''),
     ifscCode: new FormControl(''),
     businessName: new FormControl('', [Validators.required]),
     totalReturned:   new FormControl(''),
     dateOfBirth: new FormControl(''),
     address: new FormControl(''),
     briefIntroduction: new FormControl(''),
     about: new FormControl(''),
     sbCategoryName: new FormControl(''),
     fileName: new FormControl(''),
    })
 }
 
 
 ngOnInit() {
 this.listCategory();
 }
 

 listsbcategories$: Observable<Sbcategory[]>;
 sbcategories: Sbcategory[];
 listCategory() {
   this.listsbcategories$ = this.sbCategoryService.getAllCategories();
   this.listsbcategories$.subscribe(categoryList => {
     this.sbcategories = categoryList;
   })
 }



  onSelectFile(event){
      const file = event.target.files[0];
     this.snowbankFile =file;
   }
  
 saveSnowbank(submitForm: FormGroup){
   if(submitForm.valid){
     const snowbank =submitForm.value;
     const formData = new FormData();
     formData.append('snowbank', JSON.stringify(snowbank));
     formData.append('file', this.snowbankFile);
     this.snowbankService.clearCache();
     this.snowbankService.saveSnowBank(formData, this.loginUser.token).subscribe(() => {
       this.snowbankService.refreshList();
       this.toastr.success('one snow bank customer is registered successfully','TED SNOW BANK');
       this.router.navigate(['/list_snowbank']);
     },
     error => { //This is error part
      console.log(error.message);
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Something went wrong while placing the order, Please try after sometime.'
      });
    },
    () => {
        //  This is Success part
        //console.log(this.globalResponse);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Order has been placed succesfully.',
        });
        
        }
     )
     this.snowbankReactiveForm.reset();
   } else {
     this.validateFormFields(submitForm)
   }
 }
 
  validateFormFields(submitForm: FormGroup){
   Object.keys(submitForm.controls).forEach(field=>{
     const control=submitForm.get(field);
     if(control instanceof FormControl){
       control.markAsTouched({onlySelf: true});
     } else if (control instanceof FormGroup){
       this.validateFormFields(control);
     }
   })
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 


}
