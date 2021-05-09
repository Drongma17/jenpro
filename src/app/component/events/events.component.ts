import { EventsService } from './../../shared/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
 events :any =[];
 eventFile: string;
 searchEvent: string;
  constructor(private route: ActivatedRoute, private eventService: EventsService) { 
  this.eventFile =eventService.IMAGE_URL;
  }


  ngOnInit() {
  this.fetchEvents();
  }


  fetchEvents(){
    this.eventService.getAllEvents().subscribe(resp=>{
      this.events =resp;
   })
  }
}
