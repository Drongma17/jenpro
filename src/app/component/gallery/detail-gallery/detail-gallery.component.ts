import { GalleryService } from './../../../shared/services/gallery.service';
import { Gallery } from 'src/app/shared/model/gallery';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detail-gallery',
  templateUrl: './detail-gallery.component.html',
  styleUrls: ['./detail-gallery.component.css']
})
export class DetailGalleryComponent implements OnInit {

  gallerys: any =[]
  id: number;
  exist: boolean =false;
  galleryObject: Gallery;
  searchText: string;
  galleryPicture : string;
  constructor(private galleryService: GalleryService, private route: ActivatedRoute) {
    this.galleryPicture =galleryService.IMAGE_URL;
   }

  ngOnInit() {
    
    this.route.params.subscribe(params=>{
      this.id=+params['id']
    })       
     
    this.galleryService.getAllImage().subscribe(response=>{
      this.gallerys =response;
      for(var i=0; i< this.gallerys.length; i++){
        if(parseInt(this.gallerys[i].id) === this.id){
        this.exist=true;
         this.galleryObject=this.gallerys[i];
      }else{
        this.exist = false;
      }
    }
    })
  }

}
