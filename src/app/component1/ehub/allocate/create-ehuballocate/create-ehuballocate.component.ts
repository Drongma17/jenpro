import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Ehub } from 'src/app/shared/model/ehub';
import { EhubService } from 'src/app/shared/services/ehub.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EhuballocateService } from './../../../../shared/services/ehuballocate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-ehuballocate',
  templateUrl: './create-ehuballocate.component.html',
  styleUrls: ['./create-ehuballocate.component.css']
})
export class CreateEhuballocateComponent implements OnInit {

  ehubreactiveForm: FormGroup;
  ehubs: Ehub[];
  ehubFile: string;
  selectEhubId: number;
  searchEhub: string;
  public finance: any = {};
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private ehuballocateService: EhuballocateService,
    private toastr: ToastrService, private router: Router) {
    this.ehubFile = this.ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllInvestments();
  }


  getAllInvestments() {
    this.ehubService.getAllEhubs().subscribe(response => {
      this.ehubs = response;
      console.log(response)
    })
  }


  getColor(id) {
    switch (id) {
      case this.selectEhubId:
        return 'green';
      case !this.selectEhubId:
        return 'blue'
    }
  }


  selectedehub(ehubId: number) {
    this.selectEhubId = ehubId;
  }


  addEhubAllocateFinance(efinance: any, financeForm: any) {
    this.ehuballocateService.saveEhubAllocate(this.selectEhubId, efinance, this.loginAdmin.token).subscribe(response => {
      this.toastr.success('the finance is allocated to ehub successfully', 'EHUB ALLOCATE FINANCE');
      this.router.navigate(['/list_ehub_allocate'])
    })
  }
}
