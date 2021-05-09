import { GalleryService } from './../../shared/services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { Gallery } from 'src/app/shared/model/gallery';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  allgalleries: Gallery[];
  searchgallery: string;
  publicGallery_URL: string;
  constructor(private galleryService: GalleryService) { 
   this.publicGallery_URL=galleryService.IMAGE_URL;
  }

  ngOnInit() {
    this.publicGallery();
  }


  publicGallery(){
    this.galleryService.getAllImage().subscribe(response=>{
       this.allgalleries =response;
    })
  }
}
