import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { EhubService } from './../../../../shared/services/ehub.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EhuballocateService } from './../../../../shared/services/ehuballocate.service';
import { Ehub } from 'src/app/shared/model/ehub';
import { Observable } from 'rxjs';
import { Ehuballocate } from './../../../../shared/model/ehuballocate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-ehuballocate',
  templateUrl: './list-ehuballocate.component.html',
  styleUrls: ['./list-ehuballocate.component.css']
})
export class ListEhuballocateComponent implements OnInit {

  
  ehuballocates: Ehuballocate[];
  ehuballocates$: Observable<Ehuballocate[]>;
  ehubPicture: string;
  allocatedsum: number;
  allocatedAmount: number;
  selectedEhubId: number;
  ehub: Ehub;
  ehubs: Ehub[];
  searchehub: string;

  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private ehuballocateService: EhuballocateService, private ehubService: EhubService,
    private toastr: ToastrService, private router: Router) {
    this.ehubPicture = ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
  }

  preneurs: any = [];


  ngOnInit() {
    this.getAllEhubs();
    this.getAllocatedFinanceOfEhub(this.selectedEhubId);
  }



  getAllEhubs() {
    this.ehubService.getAllEhubs().subscribe(response => {
      this.ehubs = response;
    })
  }




  getAllocatedFinanceOfEhub(ehubId: number) {
    this.selectedEhubId = ehubId;
    this.ehuballocateService.getAllocationByEhubId(ehubId).subscribe(resp => {
      this.ehub = resp;
      this.allocatedAmount = this.ehub.allocatedAmount;
    })
    this.ehuballocates$ = this.ehuballocateService.getAllocationByEhubId(this.selectedEhubId)
    this.ehuballocates$.subscribe(result => {
      this.ehuballocates = result;
      this.allocatedsum = 0;
      for (var i = 0; i < this.ehuballocates.length; i++) {
        this.allocatedsum = this.allocatedsum + this.ehuballocates[i].allocateAmount;
      }
    })

  }




  getColor(id) {
    switch (id) {
      case this.selectedEhubId:
        return 'green';

      case !this.selectedEhubId:
        return 'blue'
    }
  }



  deleteEhubAllocateFinance(ehubAllocate: number) {
    if (confirm("are you sure to delete?")) {
      this.ehuballocateService.deleteEhubAllocate(this.selectedEhubId, ehubAllocate, this.loginAdmin.token).subscribe(response => {
        this.toastr.success("one milestone is deleted", "PRE-INCUBATION ALLOCATE FINANCE");
        this.router.navigate(['/list_ehub_allocate']);
      })
    }
  }
}
