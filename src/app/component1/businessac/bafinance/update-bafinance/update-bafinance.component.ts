import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Businessacfinance } from './../../../../shared/model/businessacfinance';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessacfinanceService } from './../../../../shared/services/businessacfinance.service';
import { BusinessacService } from './../../../../shared/services/businessac.service';
import { Component, OnInit } from '@angular/core';
import { Businessac } from 'src/app/shared/model/businessac';

@Component({
  selector: 'app-update-bafinance',
  templateUrl: './update-bafinance.component.html',
  styleUrls: ['./update-bafinance.component.css']
})
export class UpdateBafinanceComponent implements OnInit {

  finances: any=[];
  data: Businessacfinance;
  id: number;
  exist: boolean =false;
  fid: number;
  businessacfinanceId: number;
  businessacPicture: string;
  businessacs: Businessac[];
  selectedBusinessacId: number;
  searchBusinessac:string;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private businessacService: BusinessacService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private businessacFinanceService: BusinessacfinanceService) {
      this.businessacPicture =businessacService.IMAGE_URL;
      this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
     }

  ngOnInit() {
      this.getAllBusinessacs();
      this.getBusinessacFinanceOfSelected();
     this.route.params.subscribe(params=>{
      this.id=+params['id'];
    })
  }



  getAllBusinessacs(){
    this.businessacService.getAllBusinessac().subscribe(response=>{
      this.businessacs = response;
      })
  }



  getColor(id){
    switch(id){
      case this.selectedBusinessacId:
        return 'green';
        
      case !this.selectedBusinessacId:
        return 'blue'  
    }
  }



  
  getBusinessacFinanceOfSelected(){
     this.businessacFinanceService.getAllBusinessacfinance().subscribe(listOfFinances=>{
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

  
  
  updateBusinessacFinance(data:Businessacfinance){
    this.businessacFinanceService.updateBAFinance(this.selectedBusinessacId, this.fid, this.data, this.loginAdmin.token).subscribe(resp=>{
      this.toastr.success('the amount is updated successfully', 'BA FINANCE');
      this.router.navigate(['/list_ba_finance'])
    })
    }


    selectedBusinessac(entrepreneurId : number){
      this.selectedBusinessacId = entrepreneurId;
    }
  


   
 
    
}
