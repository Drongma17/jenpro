import { AnnounceService } from './../../shared/services/announce.service';
import { Announce } from './../../shared/model/announce';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit {
   announces$: Observable<Announce[]>;
   announces: Announce[];
   ANNOUNCEMENT_IMAGE: string;
  constructor(private announceService: AnnounceService) {
    this.ANNOUNCEMENT_IMAGE=announceService.IMAGE_URL;
   }


  ngOnInit() {
    this.getAnnouncements();
  }


getAnnouncements(){
 this.announces$= this.announceService.getAllAnnounces();
 this.announces$.subscribe(response=>{
  this.announces =response;
 })
}




}