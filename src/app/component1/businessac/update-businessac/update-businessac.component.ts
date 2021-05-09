import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Businessac } from './../../../shared/model/businessac';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-businessac',
  templateUrl: './update-businessac.component.html',
  styleUrls: ['./update-businessac.component.css']
})
export class UpdateBusinessacComponent implements OnInit {

  id: number;
  businessacs: any = [];
  exist: boolean =false;
  public businessacFile : File;
  public entrepreObj: Businessac;
  private businessacs$ : Businessac[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
  private service: BusinessacService, private formBuilder: FormBuilder,
  private toastr: ToastrService) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
     this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })

    this.service.getAllBusinessac().subscribe((res)=> {
      this.businessacs =res;
      console.log(res)
      for(var i= 0; i< this.businessacs.length; i++){
        if(parseInt(this.businessacs[i].id) === this.id){
            this.exist =true;
             this.entrepreObj =this.businessacs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  investmentUpdate(){
    const formData = new FormData();
    formData.append('businessac', JSON.stringify(this.entrepreObj));
    if(this.businessacFile){
    formData.append('file', this.businessacFile);
    }
      this.service.clearCache();
      this.service.saveBusinessacProfile(formData, this.loginAdmin.token)
      .subscribe(res=>{
        this.router.navigate(['/list_businessac']);
        this.toastr.success('One Bussiness Acceleration is Updated Successfully','TED BA')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.businessacFile =file;
 }

}
