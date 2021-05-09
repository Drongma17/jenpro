import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ste } from './../../../shared/model/ste';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SteService } from 'src/app/shared/services/ste.service';

@Component({
  selector: 'app-update-ste',
  templateUrl: './update-ste.component.html',
  styleUrls: ['./update-ste.component.css']
})
export class UpdateSteComponent implements OnInit {

 
  id: number;
  stes: any = [];
  exist: boolean =false;
  public steFile : File;
  public entrepreObj: Ste;
  private stes$ : Ste[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
  private service: SteService, private formBuilder: FormBuilder,
  private toastr: ToastrService) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
     this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })

    this.service.getAllStes().subscribe((res)=> {
      this.stes =res;
      console.log(res)
      for(var i= 0; i< this.stes.length; i++){
        if(parseInt(this.stes[i].id) === this.id){
            this.exist =true;
             this.entrepreObj =this.stes[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



   steUpdate(){
    const formData = new FormData();
    formData.append('ste', JSON.stringify(this.entrepreObj));
    if(this.steFile){
    formData.append('file', this.steFile);
    }
      this.service.clearCache();
      this.service.saveSkillToEnterprice(formData, this.loginAdmin.token)
      .subscribe(res=>{
        this.router.navigate(['/list_ste']);
        this.toastr.success('One STE Update Successfully','TED STE')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.steFile =file;
 }

}
