import { GuestService } from './../../../shared/services/guest.service';
import { Guest } from 'src/app/shared/model/guest';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-guest',
  templateUrl: './detail-guest.component.html',
  styleUrls: ['./detail-guest.component.css']
})
export class DetailGuestComponent implements OnInit {

  id: number;
  guests : any=[];
  guestObject: Guest;
  exist: boolean =false;
  guestFile: string;
  searchText: string;
  constructor(private route: ActivatedRoute, private guestService: GuestService) {
    this.guestFile =guestService.IMAGE_URL;
   }


  ngOnInit() {
  this.route.params.subscribe(params =>{
     this.id =+params['id'];
  })

    this.guestService.getAllGuests().subscribe(resp=>{
     this.guests =resp;
     for( var i=0; i< this.guests.length; i++){
       if(parseInt(this.guests[i].id) === this.id){
         this.exist =true;
         this.guestObject =this.guests[i];
         break;
       }else {
         this.exist = false;
       }
     }
    })
  }



  refresh(){
    for(var i= 0; i< this.guests.length; i++){
      if(parseInt(this.guests[i].id) === this.id){
          this.exist =true;
           this.guestObject =this.guests[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
}
