import { AuthenticationService } from './../../../shared/services/authentication.service';
import { EventsService } from '../../../shared/services/events.service';
import { Events } from '../../../shared/model/events';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  id: number;
  events: any=[];
  exist: boolean=false;
  public eventObject: Events;
  public eventFile : File;
  loginAdmin:any ={};
  constructor(private authService: AuthenticationService,private route: ActivatedRoute,private router: Router,
     private eventService: EventsService, private toastr: ToastrService) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
    })

    this.eventService.getAllEvents().subscribe((res)=>{
     this.events=res;
     for(var i=0; i<this.events.length; i++){
       if(parseInt(this.events[i].id)===this.id){
        this.exist=true;
        this.eventObject=this.events[i];
        break;
       }else{
        this.exist=false;
       }
     }
    })
  }


updateEvents(){
  const formData=new FormData();
  formData.append('event', JSON.stringify(this.eventObject));
  if(this.eventFile){
    formData.append('file', this.eventFile);
  }
  this.eventService.saveEvent(formData, this.loginAdmin.token).subscribe(res=>{
    this.router.navigate(['list_event']);
    this.toastr.success("one event update successfully ", "TED PROGRAM")
  })
}

onSelectFile(event){
  const file=event.target.files[0];
  this.eventFile = file;
}

}
