import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Steallocate } from './../../../../shared/model/steallocate';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SteallocateService } from './../../../../shared/services/steallocate.service';
import { SteService } from 'src/app/shared/services/ste.service';
import { Ste } from './../../../../shared/model/ste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-steallocate',
  templateUrl: './create-steallocate.component.html',
  styleUrls: ['./create-steallocate.component.css']
})
export class CreateSteallocateComponent implements OnInit {

 
  stes: Ste[];
  steFile: string;
  selectSteId: number;
  searchste: string;
  public finance: any = {};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private steAllocateService: SteallocateService,
    private toastr: ToastrService, private router: Router) {
    this.steFile = this.steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllStes();
  }


  getAllStes() {
    this.steService.getAllStes().subscribe(response => {
      this.stes = response;
      console.log(response)
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectSteId:
        return 'green';
      case !this.selectSteId:
        return 'blue'
    }
  }


  selectedSte(investmentId: number) {
    this.selectSteId = investmentId;
  }


  addSteAllocate(steallocate: Steallocate) {
    this.steAllocateService.saveSteAllocate(this.selectSteId, steallocate, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the amount is allocated successfully', 'STE ALLOCATION ');
      this.router.navigate(['/list_ste_allocate'])
    })
  }
}
