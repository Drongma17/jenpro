import { AuthenticationService } from './../../../shared/services/authentication.service';
import { EhubcategoryService } from './../../../shared/services/ehubcategory.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EhubService } from './../../../shared/services/ehub.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-ehub',
  templateUrl: './create-ehub.component.html',
  styleUrls: ['./create-ehub.component.css']
})
export class CreateEhubComponent implements OnInit {

  ehubForm: FormGroup;
  ehubFile: string;
  ehubcategories: any=[];
  loginAdmin: any={}
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private builder: FormBuilder, private toaster: ToastrService,
     private router: Router, private ehubcategoryService: EhubcategoryService) {
     this.authService.isLoggedIn();
     this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
      this.ehubForm =this.builder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      ehubName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      ehubCategoryName: new FormControl('', [Validators.required]),
      batch: new FormControl(''),
      allocatedAmount: new FormControl(''),
      allocateDate: new FormControl(''),
      totalDisbursed: new FormControl(''),
      businessName:new FormControl('', [Validators.required]),
      address: new FormControl(''),
      briefIntroduction:new FormControl(''),
      about:new FormControl(''),
      fileName:new FormControl(''),
    })
   }

  ngOnInit() {
    this.ehubcategories=this.ehubcategoryService.getAllEhubehubcategories();
  }

  onSelectFile(event){
    const file = event.target.files[0];
    this.ehubFile=file;
  }

  saveEhub(submitForm: FormGroup){
    if(submitForm.valid){
      const ehubform =submitForm.value;
      const formData =new FormData();
      formData.append('ehub', JSON.stringify(ehubform));
      formData.append('file', this.ehubFile);
      this.ehubService.clearCache();
      this.ehubService.saveEhubProfile(formData, this.loginAdmin.token).subscribe(response=>{
       this.toaster.success("one person is added successfully", "TED EHUB!");
      this.router.navigate(['/list_ehub']);
      })
    }
    this.validateFormFields(submitForm);
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
