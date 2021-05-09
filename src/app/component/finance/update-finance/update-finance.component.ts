import { AuthenticationService } from './../../../shared/services/authentication.service';
import { EntrepreneursService } from './../../../shared/services/entrepreneurs.service';
import { Finance, Entrepreneurs } from './../../../shared/model/entrepreneurs';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from './../../../shared/services/finance.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-finance',
  templateUrl: './update-finance.component.html',
  styleUrls: ['./update-finance.component.css']
})
export class UpdateFinanceComponent implements OnInit {

  finances: any=[];
  data: Finance;
  id: number;
  exist: boolean =false;
  fid: number;
  financeId: number;
  entrepreneurPicture: string;
  preneurs: Entrepreneurs[];
  selectedEntrepreneurId: number;
  searchEntrepreneur:string;
  loginUser: any ={}
  constructor(private authService: AuthenticationService,private financeService: FinanceService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private entrepreneurService: EntrepreneursService) {
      this.entrepreneurPicture =entrepreneurService.IMAGE_URL;
      this.authService.isLoggedIn();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
     }

  ngOnInit() {
      this.getAllPreincubations();
      this.getAllFinances();
     this.route.params.subscribe(params=>{
      this.id=+params['id'];
    })
  }



  getAllPreincubations(){
    this.entrepreneurService.getAllEntrepreneurs().subscribe(response=>{
      this.preneurs = response;
      })
  }



  getColor(id){
    switch(id){
      case this.selectedEntrepreneurId:
        return 'green';
        
      case !this.selectedEntrepreneurId:
        return 'blue'  
    }
  }



  
  getAllFinances(){
     this.financeService.getAllFinances().subscribe(listOfFinances=>{
       this.finances = listOfFinances;
       for(var i=0; i<this.finances.length; i++){
        if(parseInt(this.finances[i].id) === this.id){
         this.exist =true;
         this.data =this.finances[i];
         this.fid=parseInt(this.finances[i].id)
         break;
        }else{
          this.exist = false;
        }
       }
     })
  }

  
  
  updateFinance(data:Finance){
    this.financeService.updateFinance(this.selectedEntrepreneurId, this.fid, this.data, this.loginUser.token).subscribe(resp=>{
      this.toastr.success('the amount is updated successfully', 'TED FINANCE');
      this.router.navigate(['/list_finance'])
    })
    }


    selectedEnterp(entrepreneurId : number){
      this.selectedEntrepreneurId = entrepreneurId;
    }
  


   
 
    
}
