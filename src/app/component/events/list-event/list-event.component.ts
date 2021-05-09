import { AuthenticationService } from './../../../shared/services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { Events } from '../../../shared/model/events';
import { EventsService } from '../../../shared/services/events.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  dtOptions: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;


  public IMAGE_URL: string;
  events$: Observable<Events[]>;
  events: Events[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private eventService: EventsService,
    private router: Router, private chRef: ChangeDetectorRef) {
    this.IMAGE_URL = eventService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.events$ = this.eventService.getAllEvents();
    this.events$.subscribe(result => {
      this.events = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }


  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }


  deleteEvent(id: any) {
    if (confirm("are you sure want to delete this?")) {
      return this.eventService.deleteEvent(id, this.loginAdmin.token).subscribe(result => {
        this.eventService.clearCache();
        this.events$ = this.eventService.getAllEvents();
        this.events$.subscribe(newList => {
          this.events = newList;
          this.rerender();
        })
        this.router.navigate(['/list_event'])
      })
    }
  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}


