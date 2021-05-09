import { AuthenticationService } from './../../../shared/services/authentication.service';
import { EntrepreneurPipe } from './../../../shared/pipe/entrepreneur.pipe';
import { Entrepreneurs } from './../../../shared/model/entrepreneurs';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepreneursService } from './../../../shared/services/entrepreneurs.service';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from './../../../shared/services/finance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-finance',
  templateUrl: './create-finance.component.html',
  styleUrls: ['./create-finance.component.css']
})
export class CreateFinanceComponent implements OnInit {

  preneurs: any = [];
  public finance: any ={}
  selectedEntrepreneurId: number;
  public entrepreneurObject: Entrepreneurs;
  entrepreneurPicture: string;
  searchEntrepreneur: string;
  loginUser: any={};
  constructor(private authService: AuthenticationService ,private financeService: FinanceService, private route: ActivatedRoute, 
     private toastr: ToastrService, private entrepreneurService: EntrepreneursService, private router: Router) { 
      this.entrepreneurPicture =entrepreneurService.IMAGE_URL;
      this.authService.isLoggedIn();
     this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
    this.getAllEntrepreneur();
  }



  selectedEnterp(entrepreneurId : number){
    this.selectedEntrepreneurId = entrepreneurId;
  }

  
getAllEntrepreneur(){
  this.entrepreneurService.getAllEntrepreneurs().subscribe(response=>{
    this.preneurs =response;
  })
}



  addFinance(finance:any, financeForm: any){
    this.financeService.saveFinance(this.selectedEntrepreneurId, finance, this.loginUser.token).subscribe(resp=>{
      this.toastr.success('the amount is added successfully', 'TED FINANCE');
      this.router.navigate(['/list_finance'])
    })
    financeForm.reset();
    }


  
    getColor(id){
      switch(id){
        case this.selectedEntrepreneurId:
          return 'green';
        case !this.selectedEntrepreneurId:
          return 'blue'  
      }
    }
    


  }




 

