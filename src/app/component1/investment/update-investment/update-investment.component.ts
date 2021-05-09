import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { InvestmentService } from './../../../shared/services/investment.service';
import { FormBuilder } from '@angular/forms';
import { Investment } from './../../../shared/model/investment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-investment',
  templateUrl: './update-investment.component.html',
  styleUrls: ['./update-investment.component.css']
})
export class UpdateInvestmentComponent implements OnInit {

 
  id: number;
  investments: any = [];
  exist: boolean =false;
  public investmentFile : File;
  public entrepreObj: Investment;
  private investments$ : Investment[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
  private service: InvestmentService, private formBuilder: FormBuilder,
  private toastr: ToastrService) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
     this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })

    this.service.getAllInvestments().subscribe((res)=> {
      this.investments =res;
      console.log(res)
      for(var i= 0; i< this.investments.length; i++){
        if(parseInt(this.investments[i].id) === this.id){
            this.exist =true;
             this.entrepreObj =this.investments[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  investmentUpdate(){
    const formData = new FormData();
    formData.append('investment', JSON.stringify(this.entrepreObj));
    if(this.investmentFile){
    formData.append('file', this.investmentFile);
    }
      this.service.clearCache();
      this.service.saveInvestmentProfile(formData, this.loginAdmin.token)
      .subscribe(res=>{
        this.router.navigate(['/list_investment']);
        this.toastr.success('One Investment Update Successfully','TED INVESTMENT')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.investmentFile =file;
 }

}
