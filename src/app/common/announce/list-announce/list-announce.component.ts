import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Announce } from './../../../shared/model/announce';
import { AnnounceService } from './../../../shared/services/announce.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-list-announce',
  templateUrl: './list-announce.component.html',
  styleUrls: ['./list-announce.component.css']
})
export class ListAnnounceComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;

   announces$: Observable<Announce[]>;
   announces: Announce[];
   ANNOUNCEMENT_IMAGE: string;
  constructor(private announceService: AnnounceService, private chRef: ChangeDetectorRef, private router: Router) {
    this.ANNOUNCEMENT_IMAGE=announceService.IMAGE_URL;
   }


  ngOnInit() {
    this.getAnnouncements();

    this.dtOptions ={
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [0, 'desc']
    }
  }


getAnnouncements(){
 this.announces$= this.announceService.getAllAnnounces();
 this.announces$.subscribe(response=>{
  this.announces =response;
  this.chRef.detectChanges();
  this.dtTrigger.next();
 })
}

rerender(){
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
    dtInstance.destroy();
    this.dtTrigger.next();
  })
}



deleteAnnounce(id: any) {
  if (confirm("Are you sure to delete?")) {
    return this.announceService.deleteannouncement(id).subscribe(result=>
      {
        this.announceService.clearCache();
        this.announces$=this.announceService.getAllAnnounces();
        this.announces$.subscribe(newList=>
          {
            this.announces=newList;
            this.rerender();
          })
          this.router.navigate(['/list_announce'])
      })
  }
}

ngOnDestroy() 
{
    this.dtTrigger.unsubscribe();
}
}
