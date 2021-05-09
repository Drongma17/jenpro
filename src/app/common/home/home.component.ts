import { AuthenticationService } from './../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from './../../shared/services/application.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reactiveApplicantForm: FormGroup;
  applicationFile: File;
  applicationPdf: File;
 
  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService, private toastr: ToastrService) {
    this.reactiveApplicantForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      applicantName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]),
      phoneNumber: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])]),
      categoryName: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      purpose: new FormControl(''),
      businessName: new FormControl(''),
      greenbook: new FormControl(''),
      address: new FormControl(''),
      about: new FormControl(''),
      fileName: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.applicationFile = file;
  }


  onSelectPdf(event){
    const pdf = event.target.files[0];
    this.applicationPdf = pdf;
  }


  saveApplicant(submitForm: FormGroup) {
    if (submitForm.valid) {
      const applicationForm = submitForm.value;
      const formData = new FormData();
      formData.append('application', JSON.stringify(applicationForm));
      formData.append('file', this.applicationFile);
      formData.append('pdf', this.applicationPdf);
      this.applicationService.saveApplication(formData).subscribe(response => {
        this.toastr.success("application is submited successfully", "APPLICATION FORM");
        this.reactiveApplicantForm.reset();
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
