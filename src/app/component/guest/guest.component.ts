import { GuestService } from './../../shared/services/guest.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guests :any =[];
  guestFile: string;
  searchEvent: string;
   constructor(private route: ActivatedRoute, private guestService: GuestService) { 
   this.guestFile =guestService.IMAGE_URL;
   }
 
 
   ngOnInit() {
   this.fetchEvents();
   }
 
   fetchEvents(){
     this.guestService.getAllGuests().subscribe(resp=>{
       this.guests =resp;
    })
   }
 }
 