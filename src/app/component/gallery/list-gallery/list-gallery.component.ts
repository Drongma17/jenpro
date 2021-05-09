import { AuthenticationService } from './../../../shared/services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Gallery } from '../../../shared/model/gallery';
import { GalleryService } from '../../../shared/services/gallery.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-gallery',
  templateUrl: './list-gallery.component.html',
  styleUrls: ['./list-gallery.component.css']
})
export class ListGalleryComponent implements OnInit {
 
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;

  
  public IMAGE_URL: string;
  galleries$: Observable<Gallery[]>;
  galleries: Gallery[];
  loginAdmin: any ={};
  constructor( private authService: AuthenticationService,private service: GalleryService,
    private router: Router, private chRef: ChangeDetectorRef) {
    this.IMAGE_URL = service.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }



  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.galleries$ = this.service.getAllImage();
    this.galleries$.subscribe(result => {
      this.galleries = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }




  deletePicture(id: any) {
    if (confirm("Are you sure to delete?")) {
      return this.service.deleteImage(id, this.loginAdmin.token).subscribe(result=>
        {
          this.service.clearCache();
          this.galleries$=this.service.getAllImage();
          this.galleries$.subscribe(newList=>
            {
              this.galleries=newList;
              this.rerender();
            })
            this.router.navigate(['/list_gallery'])
        })
    }
  }


  ngOnDestroy() 
  {
      // Do not forget to unsubscribe
      this.dtTrigger.unsubscribe();
  }

  }

