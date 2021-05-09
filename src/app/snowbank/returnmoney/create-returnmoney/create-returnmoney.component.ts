import { Router, ActivatedRoute } from '@angular/router';
import { ReturnmoneyService } from './../../service/returnmoney.service';
import { SnowbankService } from './../../service/snowbank.service';
import { Snowbank } from './../../model/snowbank';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-returnmoney',
  templateUrl: './create-returnmoney.component.html',
  styleUrls: ['./create-returnmoney.component.css']
})
export class CreateReturnmoneyComponent implements OnInit {

  
  snowbanks: any = [];
  public snowbank: any ={}
  selectedSnowbankId: number;
  public snowbankObject: Snowbank;
  snowbankPicture: string;
  loginUser: any={};
  constructor(private authService: AuthenticationService ,private returnMoneyService: ReturnmoneyService, private route: ActivatedRoute, 
     private toastr: ToastrService, private snowbankService: SnowbankService, private router: Router) { 
      this.snowbankPicture =snowbankService.IMAGE_URL;
      this.authService.isLoggedIn();
     this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
    this.getAllSnowbanks();
  }



  selectedSnowbank(entrepreneurId : number){
    this.selectedSnowbankId = entrepreneurId;
  }

  
getAllSnowbanks(){
  this.snowbankService.getAllSnowbanks().subscribe(response=>{
    this.snowbanks =response;
  })
}



  addReturnMoney(returnmoney:any){
    this.returnMoneyService.saveReturnMoney(this.selectedSnowbankId, returnmoney, this.loginUser.token).subscribe(resp=>{
      this.toastr.success('the amount is added successfully', 'SNOW BANK RETURN MONEY');
      this.router.navigate(['/list_returnmoney_snowbank'])
    })
    }


  
    getColor(id){
      switch(id){
        case this.selectedSnowbankId:
          return 'green';
        case !this.selectedSnowbankId:
          return 'blue'  
      }
    }
    


  }




 

