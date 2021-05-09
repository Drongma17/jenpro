import { ReturnmoneyService } from './../../service/returnmoney.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Returnmoney } from './../../model/returnmoney';
import { Snowbank } from './../../model/snowbank';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { SnowbankService } from './../../service/snowbank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-returnmoney',
  templateUrl: './update-returnmoney.component.html',
  styleUrls: ['./update-returnmoney.component.css']
})
export class UpdateReturnmoneyComponent implements OnInit {

  returnmoneys: any=[];
  data: Returnmoney;
  id: number;
  exist: boolean =false;
  fid: number;
  financeId: number;
  snowbankPicture: string;
  snowbanks: Snowbank[];
  selectedSnowbankId: number;
  searchSnowbank:string;
  loginUser: any ={}
  constructor(private authService: AuthenticationService,private returnmoneyService: ReturnmoneyService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private snowbankService: SnowbankService) {
      this.snowbankPicture =snowbankService.IMAGE_URL;
      this.authService.isLoggedIn();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
     }

  ngOnInit() {
      this.getAllSnowbanks();
      this.getAllReturnmoneys();
     this.route.params.subscribe(params=>{
      this.id=+params['id'];
    })
  }



  getAllSnowbanks(){
    this.snowbankService.getAllSnowbanks().subscribe(response=>{
      this.snowbanks = response;
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



  
  getAllReturnmoneys(){
     this.returnmoneyService.getAllReturnMoney().subscribe(listOfreturnmoneys=>{
       this.returnmoneys = listOfreturnmoneys;
       for(var i=0; i<this.returnmoneys.length; i++){
        if(parseInt(this.returnmoneys[i].id) === this.id){
         this.exist =true;
         this.data =this.returnmoneys[i];
         this.fid=parseInt(this.returnmoneys[i].id)
         break;
        }else{
          this.exist = false;
        }
       }
     })
  }

  
  
  updateReturnmoney(data:Returnmoney){
    this.returnmoneyService.updateReturnMoney(this.selectedSnowbankId, this.fid, this.data, this.loginUser.token).subscribe(resp=>{
      this.toastr.success('the amount is updated successfully', 'SNOW BANK');
      this.router.navigate(['/list_returnmoney_snowbank'])
    })
    }


    selectedSnowbank(snowbankId : number){
      this.selectedSnowbankId = snowbankId;
    }
    
}
