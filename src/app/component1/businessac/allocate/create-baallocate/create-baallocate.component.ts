import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Baallocate } from './../../../../shared/model/baallocate';
import { BaallocateService } from './../../../../shared/services/baallocate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Businessac } from './../../../../shared/model/businessac';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-baallocate',
  templateUrl: './create-baallocate.component.html',
  styleUrls: ['./create-baallocate.component.css']
})
export class CreateBaallocateComponent implements OnInit {

 
  businessacs: Businessac[];
  businessacFile: string;
  selectBusinessacId: number;
  searchbusinessac: string;
  public finance: any = {};
  loginAdmin:any ={};
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private baallocateService: BaallocateService,
    private toastr: ToastrService, private router: Router) {
    this.businessacFile = this.businessacService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllBusinessac();
  }


  getAllBusinessac() {
    this.businessacService.getAllBusinessac().subscribe(response => {
      this.businessacs = response;
      console.log(response)
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectBusinessacId:
        return 'green';
      case !this.selectBusinessacId:
        return 'blue'
    }
  }


  selectedBusinessac(ehubId: number) {
    this.selectBusinessacId = ehubId;
  }


  addBusinessacAllocate(allocate: Baallocate) {
    this.baallocateService.saveallocateToBusinessac(this.selectBusinessacId, allocate, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is allocated successfully', 'BA ALLOCATION');
      this.router.navigate(['/list_ba_allocate'])
    })
  }
}

