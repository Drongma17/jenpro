import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { GuestService } from '../../../shared/services/guest.service';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  public guestReactiveForm : FormGroup;
  public guestFile : File;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private builder: FormBuilder, private guestService: GuestService,
    private toastr: ToastrService, private router : Router
    ) { 

      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
    this.guestReactiveForm=this.builder.group({
      id: [],
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])],
      phoneNumber: ['', Validators.compose([Validators.pattern('[0-9+]*'), Validators.minLength(10), Validators.maxLength(14)])],
      gender: [''],
      highestDegree: [''], 
      speakingDate: [''],
      topicToSpeck: [''],
      bioData: [''],
      fileName: ['']
    })
  }

  ngOnInit() {

  }  

 
  onSelectFile(event){
    const file =event.target.files[0];
    this.guestFile=file;
  }

  saveGuest(submitForm: FormGroup){
      if(submitForm.valid){
       const guestFormValue=submitForm.value;
       const formData=new FormData();
       formData.append('guest', JSON.stringify(guestFormValue)) ;
       formData.append('file', this.guestFile); 
       this.guestService.clearCache();
       return this.guestService.saveGuest(formData, this.loginAdmin.token)
       .subscribe((response)=>{
         console.log(response);
        this.toastr.success("One guest inserted successfully", "TED GUEST");
        this.router.navigate(['/list_guest']);
       })
        this.guestReactiveForm.reset();
      }else {
     this.validateFormField(submitForm);
      }
  }


   validateFormField(submitForm: FormGroup){
    Object.keys(submitForm.controls).forEach(fields=>{
      const control =submitForm.get(fields);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true})
      }else if(control instanceof FormGroup){
        this.validateFormField(control);
      }
    })
   }
  
}
 