import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaallocateService } from './../../../../shared/services/baallocate.service';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Observable } from 'rxjs';
import { Baallocate } from './../../../../shared/model/baallocate';
import { Businessac } from './../../../../shared/model/businessac';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-baallocate',
  templateUrl: './list-baallocate.component.html',
  styleUrls: ['./list-baallocate.component.css']
})
export class ListBaallocateComponent implements OnInit {



  searchbusinessac: string;
  businessacs: Businessac[];
  businessac: Businessac;
  businessacPicture: string;
  selectedbusinessacId: number;
  allocatedAmount: number;
  allocatedDate: any;
  businessacallocates$: Observable<Baallocate[]>;
  businessacallocates: Baallocate[];
  grandTotal: number;
  loginAdmin: any ={}
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private baallocateService: BaallocateService, private toastr: ToastrService, private router: Router) {
    this.businessacPicture = businessacService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllBusinessac();
  }

  getAllBusinessac() {
    this.businessacService.getAllBusinessac().subscribe(response => {
      this.businessacs = response;
    })
  }



  getAllocateFinanceOfBusinessac(businessacId: number) {
    this.selectedbusinessacId = businessacId;
    this.businessacService.getBusinessac(businessacId).subscribe(response => {
      this.businessac = response;
      this.allocatedAmount = this.businessac.allocatedAmount;
      this.allocatedDate = this.businessac.allocateDate;
    })

    this.businessacallocates$ = this.baallocateService.getAllocationByBAId(this.selectedbusinessacId);
    this.businessacallocates$.subscribe(responose => {
      this.businessacallocates = responose;
      this.grandTotal = 0.0;
      for (var i = 0; i < this.businessacallocates.length; i++) {
        this.grandTotal = this.grandTotal + this.businessacallocates[i].allocateAmount;
      }
    })
  }




  getColor(id) {
    switch (id) {
      case this.selectedbusinessacId:
        return 'green';

      case !this.selectedbusinessacId:
        return 'blue'
    }
  }


  deletebaallocate(baId: number) {
    if (confirm("are you sure to delete?")) {
      this.baallocateService.deleteBAallocation(this.selectedbusinessacId, baId, this.loginAdmin.token).subscribe(response => {
        this.router.navigate(['/list_ba_finance'])
        this.toastr.success("one milestone is deleted successfully", "BA FINANCE");
      })
    }
  }
}