import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Stecategory } from './../../../shared/model/stecategory';
import { StecategoryService } from 'src/app/shared/services/stecategory.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl } from '@angular/forms';
import { SteService } from './../../../shared/services/ste.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-ste',
  templateUrl: './create-ste.component.html',
  styleUrls: ['./create-ste.component.css']
})
export class CreateSteComponent implements OnInit {

  steReactiveForm: FormGroup;
  steFile: string;
  stecategories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private builder: FormBuilder, private toastr: ToastrService, private router: Router, private stecategoryService: StecategoryService) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
    this.steReactiveForm = this.builder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      steName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      batch: new FormControl(''),
      steCategoryName: new FormControl('', [Validators.required]),
      totalDisbursed: new FormControl(''),
      businessName: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      briefIntroduction: new FormControl(''),
      about: new FormControl(''),
      fileName: new FormControl(''),
    })
  }


 ngOnInit(){
  this.stecategories = this.stecategoryService.getAllSteCategories();
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.steFile = file;
  }


  saveSteProfile(submitForm: FormGroup){
    if(submitForm.valid){
      const stevalue=submitForm.value;
      const formData=new FormData();
      formData.append('ste', JSON.stringify(stevalue));
      formData.append('file', this.steFile);
      this.steService.clearCache();
      this.steService.saveSkillToEnterprice(formData, this.loginAdmin.token).subscribe((res)=>{
      this.toastr.success('One STE registered successfully', 'TED STE');
      this.router.navigate(['list_ste']);
      })
      this.steReactiveForm.reset();
    }else{
    this.validateFormFields(submitForm);
    }
    }
    
    validateFormFields(submitForm: FormGroup){
    Object.keys(submitForm.controls).forEach(field=>{
      const control=submitForm.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateFormFields(control);
      }
    })
    }

}