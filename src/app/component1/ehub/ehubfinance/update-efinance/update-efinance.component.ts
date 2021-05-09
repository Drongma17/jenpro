import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Ehubfinance } from './../../../../shared/model/ehub';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EhubService } from 'src/app/shared/services/ehub.service';
import { EhubfinanceService } from './../../../../shared/services/ehubfinance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-efinance',
  templateUrl: './update-efinance.component.html',
  styleUrls: ['./update-efinance.component.css']
})
export class UpdateEfinanceComponent implements OnInit {

  ehubs: any = [];
  ehubPicture: string;
  selectedEhubId: number;
  ehubfinances: any = [];
  id: number;
  exist: boolean = false;
  data: Ehubfinance;
  ehubfinanceId: number;
  searchehub:string;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private ehubfinanceService: EhubfinanceService, 
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.ehubPicture = ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllEhubs();
    this.getEhubFinanceOfSelected();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }


  getAllEhubs() {
    this.ehubService.getAllEhubs().subscribe(listehubs => {
      this.ehubs = listehubs;
    })
  }

  selectedEhub(ehubid: number) {
    this.selectedEhubId = ehubid;
  }


  getColor(id) {
    switch (id) {
      case this.selectedEhubId:
        return 'green';

      case !this.selectedEhubId:
        return 'blue';
    }
  }


  getEhubFinanceOfSelected() {
    this.ehubfinanceService.getAllEhubFinances().subscribe(listehubfinances => {
      this.ehubfinances = listehubfinances;
      for (var i = 0; i < this.ehubfinances.length; i++) {
        if (parseInt(this.ehubfinances[i].id) === this.id) {
          this.data = this.ehubfinances[i];
          this.exist = true;
          this.ehubfinanceId = parseInt(this.ehubfinances[i].id);
        } else {
          this.exist = false;
        }
      }
    })
  }



  updateEhubFinance(data:Ehubfinance) {
   this.ehubfinanceService.updateEhubFinance(this.selectedEhubId,  this.ehubfinanceId, this.data, this.loginAdmin.token).subscribe(response=>{
    this.toastr.success("ehub milestone is updated successfully", "EHUB FINANCE");
    this.router.navigate(['/list_ehub_finance']);
   })
  }




}
