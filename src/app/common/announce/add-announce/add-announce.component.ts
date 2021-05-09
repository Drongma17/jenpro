import { ToastrService } from 'ngx-toastr';
import { AnnounceService } from './../../../shared/services/announce.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.css']
})
export class AddAnnounceComponent implements OnInit {

 public announcementReactiveForm: FormGroup;
  announceFile: File;
  constructor(private formBuilder: FormBuilder, private announceService: AnnounceService,
     private toastr: ToastrService, private router: Router) { 
    this.announcementReactiveForm =formBuilder.group({
      id: new FormControl(''),
      title: new FormControl(''),
      subject: new FormControl('', [Validators.required]),
      body : new FormControl('', [Validators.required]),
      date: new FormControl(''),
      fileName: new FormControl('')
    })
  }

  ngOnInit() {
    
  }

  onSelectFile(event){
  const file=event.target.files[0];
  this.announceFile =file;
}

  saveAnnounce(formsubmit: FormGroup){
    if(formsubmit.valid){
      const announcement=formsubmit.value;
      const formData=new FormData();
      formData.append('file', this.announceFile);
      formData.append('announce', JSON.stringify(announcement));
      this.announceService.clearCache();
      this.announceService.saveAnnouncement(formData).subscribe(resp=>{
        this.toastr.success('Announcement added successfully', 'Announcement Created');
        this.router.navigate(['list_announce']);
      })
      this.announcementReactiveForm.reset();
    }else{
      this.validateFormFields(formsubmit);
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
