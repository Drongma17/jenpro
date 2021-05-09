import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Gallery } from '../../../shared/model/gallery';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GalleryService } from '../../../shared/services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.css']
})
export class CreateGalleryComponent implements OnInit {

  public galleryReactiveForm: FormGroup;
  public galleryFile: File;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private builder: FormBuilder, private galleryService: GalleryService,
    private toastr: ToastrService, private router: Router) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
    this.galleryReactiveForm = this.builder.group({
      id: new FormControl(''),
      photoName: new FormControl('', [Validators.required]),
      subDescription: new FormControl('', [Validators.required]),
      imageDate: new FormControl(''),
      galleryDescription: new FormControl(''),
      fileName: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  onSelectFile(event){
    const file = event.target.files[0];
   this.galleryFile =file;
 }


  saveGallery(submitForm: FormGroup) {
    if (this.galleryReactiveForm.valid) {
      const reactiveForm = this.galleryReactiveForm.value;
      const formData = new FormData();
      formData.append('file', this.galleryFile);
      formData.append('gallery', JSON.stringify(reactiveForm));
      this.galleryService.clearCache();
      this.galleryService.saveGallery(formData, this.loginAdmin.token).subscribe((res) => {
        this.toastr.success("One Photo inserted successfully", "TED GALLERY");
        this.router.navigate(['/list_gallery']);
      });
      this.galleryReactiveForm.reset();
    } else {
      this.validateFormFields(submitForm);
    }
  }

  validateFormFields(submitForm: FormGroup) {
    Object.keys(submitForm.controls).forEach(field => {
      const control = submitForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ 'onlySelf': true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(submitForm);
      }
    })
  }
}
