import { AuthenticationService } from './../../../shared/services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Gallery } from './../../../shared/model/gallery';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../../shared/services/gallery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-gallery',
  templateUrl: './update-gallery.component.html',
  styleUrls: ['./update-gallery.component.css']
})
export class UpdateGalleryComponent implements OnInit {

  id: number;
  galleries: any = [];
  exist: boolean =false;
  public galleryFile : File;
  public galleryObject: Gallery;
  private gallery$ : Gallery[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
     private service: GalleryService, private formBuilder: FormBuilder,
      private toastr: ToastrService) {
        this.authService.isLoggedIn();
        this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
        
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });



    this.service.getAllImage().subscribe((res)=> {
      this.galleries =res;
      console.log(res)
      for(var i= 0; i< this.galleries.length; i++){
        if(parseInt(this.galleries[i].id) === this.id){
            this.exist =true;
             this.galleryObject =this.galleries[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  updateGallery(){
    const formData = new FormData();
    formData.append('gallery', JSON.stringify(this.galleryObject));
    if(this.galleryFile){
    formData.append('file', this.galleryFile);
    }
      this.service.clearCache();
      this.service.saveGallery(formData, this.loginAdmin.token)
      .subscribe(res=>{
        this.router.navigate(['/list_gallery']);
        this.toastr.success('One Photo Update successfully','TED GALLERY')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.galleryFile =file;
 }

  
}
