import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SteallocateService } from './../../../../shared/services/steallocate.service';
import { SteService } from './../../../../shared/services/ste.service';
import { Steallocate } from './../../../../shared/model/steallocate';
import { Observable } from 'rxjs';
import { Ste } from './../../../../shared/model/ste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-steallocate',
  templateUrl: './list-steallocate.component.html',
  styleUrls: ['./list-steallocate.component.css']
})
export class ListSteallocateComponent implements OnInit {

  searcheste: string;
  stes: Ste[];
  ste: Ste;
  stePicture: string;
  selectedsteId: number;
  allocatedAmount: number;
  allocatedDate: any;
  steallocates$: Observable<Steallocate[]>;
  steallocates: Steallocate[];
  grandTotal: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private steallocateService: SteallocateService, private toastr: ToastrService, private router: Router) {
    this.stePicture = steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllStes();
  }

  getAllStes() {
    this.steService.getAllStes().subscribe(response => {
      this.stes = response;
    })
  }



  getAllocateOfSte(ehubId: number) {
    this.selectedsteId = ehubId;
    this.steService.getSte(ehubId).subscribe(response => {
      this.ste = response;
      this.allocatedAmount = this.ste.allocatedAmount;
      this.allocatedDate = this.ste.allocateDate;
    })
  
    this.steallocates$ = this.steallocateService.getAllAllocatedBySteId(this.selectedsteId);
    this.steallocates$.subscribe(responose => {
      this.steallocates = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.steallocates.length; i++) {
        this.grandTotal = this.grandTotal + this.steallocates[i].allocatedAmount;
      }
    })
  }


 
  getColor(id) {
    switch (id) {
      case this.selectedsteId:
        return 'green';

      case !this.selectedsteId:
        return 'blue'
    }
  }


  deletesteAllocate(stefinanceId: number) {
    if (confirm("are you sure to delete ?")) {
      this.steallocateService.deleteSteallocate(this.selectedsteId, stefinanceId, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one allocated is deleted successfully", "STE ALLOCATE");
        this.router.navigate(['/list_ste_allocate']);
      })
    }
  }
}
