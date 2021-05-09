import { Observable } from 'rxjs';
import { Sbcategory } from './../../model/sbcategory';
import { SbcategoryService } from './../../service/sbcategory.service';
import { ToastrService } from 'ngx-toastr';
import { SnowbankService } from './../../service/snowbank.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Snowbank } from './../../model/snowbank';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  id: number;
  snowbanks: any = [];
  exist: boolean =false;
  public snowbankFile : File;
  public snowBankReactiveForm: FormGroup;
  public snowbankObject: Snowbank;

  loginUser: any ={}
  sbcategories: Observable<Sbcategory[]>;
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
     private service: SnowbankService, private formBuilder: FormBuilder,
      private toastr: ToastrService, private sbcategoryService: SbcategoryService) {
        this.authService.isLoggedIn();
        this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
  }



  ngOnInit() {
    this.sbcategories = this.sbcategoryService.getAllCategories();

      this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })




    this.service.getAllSnowbanks().subscribe((res)=> {
      this.snowbanks =res;
      console.log(res)
      for(var i= 0; i< this.snowbanks.length; i++){
        if(parseInt(this.snowbanks[i].id) === this.id){
            this.exist =true;
             this.snowbankObject =this.snowbanks[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  updateSnowbank(){
    const formData = new FormData();
    formData.append('snowbank', JSON.stringify(this.snowbankObject));
    if(this.snowbankFile){
    formData.append('file', this.snowbankFile);
    }
      this.service.clearCache();
      this.service.saveSnowBank(formData, this.loginUser.token)
      .subscribe(res=>{
        this.router.navigate(['/list_snowbank']);
        this.toastr.success('One Customer Update Successfully','TED SNOW BANK')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.snowbankFile =file;
 }

}
