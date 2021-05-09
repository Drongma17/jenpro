import { AuthenticationService } from './../../../shared/services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { GuestService } from '../../../shared/services/guest.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Guest } from 'src/app/shared/model/guest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-guest',
  templateUrl: './list-guest.component.html',
  styleUrls: ['./list-guest.component.css']
})
export class ListGuestComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;



  IMAGE_URL: string;
  guests$: Observable<Guest[]>;
  guests: Guest[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private guestService: GuestService, private router: Router, private chRef: ChangeDetectorRef) {
    this.IMAGE_URL = guestService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [[0, 'desc']]
    }

    this.guests$=this.guestService.getAllGuests();
    this.guests$.subscribe(result=>{
      this.guests = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }



  deleteGuest(id: any){
    if (confirm("Are you sure to delete?")) {
      return this.guestService.deleteGuest(id, this.loginAdmin.token).subscribe(result=>{
        this.guestService.clearCache();
        this.guests$=this.guestService.getAllGuests();
        this.guests$.subscribe(newList=>{
          this.guests =newList;
          this.rerender();
        })
        this.router.navigate(['/list_guest']);
      })
    }
  }



  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }


  ngOnDestroy() 
  {
      this.dtTrigger.unsubscribe();
  }
}






