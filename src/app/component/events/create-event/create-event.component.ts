import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../../../shared/services/events.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  public eventReactiveForm: FormGroup;
  public eventFile: File;
  loginAdmin: any ={};

  constructor(private authService: AuthenticationService,private eventService: EventsService, private formbuilder: FormBuilder, 
    private toastr: ToastrService, private router: Router) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'));

      this.eventReactiveForm=this.formbuilder.group({
     id: new FormControl(''),
     eventName: new FormControl('', [Validators.required, Validators.minLength(3)]),
     eventDate: new FormControl(''),
     eventVanue: new FormControl('', [Validators.required]),
     aboutEvent: new FormControl(''),
     fileName: new FormControl('')
   })
   }

  ngOnInit() {
  }


onSelectFile(event){
  const file=event.target.files[0];
  this.eventFile=file;
}

saveEventProfile(submitForm: FormGroup){
if(submitForm.valid){
  const events=submitForm.value;
  const formData=new FormData();
  formData.append('event', JSON.stringify(events));
  formData.append('file', this.eventFile);
  this.eventService.clearCache();
  this.eventService.saveEvent(formData, this.loginAdmin.token).subscribe((res)=>{
  this.toastr.success('One Event registered successfully', 'TED PROGRAME');
  this.router.navigate(['list_event']);
  })
  this.eventReactiveForm.reset();
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
