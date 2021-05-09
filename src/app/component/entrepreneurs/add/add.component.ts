import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Category } from './../../../shared/model/category';
import { CategoryService } from './../../../shared/services/category.service';
import { Entrepreneurs } from '../../../shared/model/entrepreneurs';
import { IAlert } from '../../../shared/model/IAlert';
import { ToastrService } from 'ngx-toastr';
import { EntrepreneursService } from '../../../shared/services/entrepreneurs.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public entrepreneurReactiveForm: FormGroup;
  public entrepreneurFile : File;
  public alerts: Array<IAlert> = [];
  private entrepreneur$ : Entrepreneurs[];
  public categories: any=[];
  public loginUser: any={}
 constructor(private authService: AuthenticationService,  private entrepreneurService: EntrepreneursService, private formBuilder : FormBuilder,
   private router: Router, private toastr: ToastrService, private categoryService: CategoryService) { 
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'))

   this.entrepreneurReactiveForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl(''),
     entrepreneurName: new FormControl('', [Validators.required, Validators.minLength(3)]),
     email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
     phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
     gender:  new FormControl(''),
     allocatedAmount: new FormControl(''),
     businessName: new FormControl('', [Validators.required]),
     totalDisbursed:   new FormControl(''),
     dateOfBirth: new FormControl(''),
     allocateDate: new FormControl(''),
     address: new FormControl(''),
     briefIntroduction: new FormControl(''),
     about: new FormControl(''),
     categoryName: new FormControl('',[Validators.required]),
     fileName: new FormControl(''),
    })
 }
 
 
 ngOnInit() {
  this.categories = this.categoryService.getAllCategories();
 }
 

  onSelectFile(event){
      const file = event.target.files[0];
     this.entrepreneurFile =file;
   }
  
 saveEntrepreneurs(submitForm: FormGroup){
   if(submitForm.valid){
     const entrepre =submitForm.value;
     const formData = new FormData();
     formData.append('entrepre', JSON.stringify(entrepre));
     formData.append('file', this.entrepreneurFile);
     this.entrepreneurService.clearCache();
     this.entrepreneurService.saveEntrepreneurProfile(formData, this.loginUser.token).subscribe(() => {
       this.entrepreneurService.refreshList();
       this.toastr.success('one entrepreneure registered successfully','TED ENTREPRENEURE');
       this.router.navigate(['/list_pre_incubation']);
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
     this.entrepreneurReactiveForm.reset();
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
