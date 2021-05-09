import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Baallocate } from './../../../../shared/model/baallocate';
import { BaallocateService } from './../../../../shared/services/baallocate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-baallocate',
  templateUrl: './update-baallocate.component.html',
  styleUrls: ['./update-baallocate.component.css']
})
export class UpdateBaallocateComponent implements OnInit {

  businessacs: any = [];
  businessacPicture: string;
  searchBusinessac: string;
  businessacId: number;
  baallocates: any = [];
  id: number;
  data: Baallocate;
  exist: boolean = false;
  bafinancdId: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private baallocateService: BaallocateService,
     private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.businessacPicture = businessacService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllBusinessacs();
    this.getAllBAAllocate();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }



  getAllBusinessacs() {
    this.businessacService.getAllBusinessac().subscribe(listba => {
      this.businessacs = listba;
    })
  }


  getColor(id) {
    switch (id) {
      case this.businessacId:
        return 'green';

      case !this.businessacId:
        return 'blue';
    }
  }

  selectedbusinessac(selectedba: number) {
    this.businessacId = selectedba;
  }


  getAllBAAllocate() {
    this.baallocateService.getAllBusinessacAllocation().subscribe(listfinances => {
      this.baallocates = listfinances;
      for (var i = 0; i < this.baallocates.length; i++) {
        if (parseInt(this.baallocates[i].id) === this.id) {
          this.exist = true;
          this.data = this.baallocates[i];
          this.bafinancdId = parseInt(this.baallocates[i].id);
        }
      }
    })
  }


updatebaallocate(data:any){
  this.baallocateService.updateallocateofbusinessac(this.businessacId, this.bafinancdId, this.data, this.loginAdmin.token).subscribe(response=>{
  this.toastr.success("one allocate of ba is updated successfully", "BA ALLOCATE");
  this.router.navigate(['/list_ba_allocate']);
  })
}

}
