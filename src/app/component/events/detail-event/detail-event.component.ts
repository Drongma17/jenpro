import { EventsService } from './../../../shared/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {

 
  id: number;
  events : any=[];
  eventObject: any ={};
  exist: boolean =false;
  eventFile: string;
  searchText: string;
  constructor(private route: ActivatedRoute, private eventService: EventsService) {
    this.eventFile =eventService.IMAGE_URL;
   }


  ngOnInit() {
  this.route.params.subscribe(params =>{
     this.id =+params['id'];
  })

  this.fetchEvent();
  }


  fetchEvent(){
    this.eventService.getAllEvents().subscribe(resp=>{
      this.events =resp;
      for( var i=0; i< this.events.length; i++){
        if(parseInt(this.events[i].id) === this.id){
          this.exist =true;
          this.eventObject =this.events[i];
          break;
        }else {
          this.exist = false;
        }
      }
     })
  }

  refresh(){
    for( var i=0; i< this.events.length; i++){
      if(parseInt(this.events[i].id) === this.id){
        this.exist =true;
        this.eventObject =this.events[i];
        break;
      }else {
        this.exist = false;
      }
    }
  }
}
