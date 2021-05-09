import { AuthenticationService } from './../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EhubService } from './../../../shared/services/ehub.service';
import { Component, OnInit } from '@angular/core';
import { Ehub } from './../../../shared/model/ehub';


@Component({
  selector: 'app-update-ehub',
  templateUrl: './update-ehub.component.html',
  styleUrls: ['./update-ehub.component.css']
})
export class UpdateEhubComponent implements OnInit {

 
  id: number;
  ehubs: any = [];
  exist: boolean =false;
  public ehubFile : File;
  public ehubReactiveFormGroup: FormGroup;
  public entrepreObj: Ehub;
  loginAdmin: any={};
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
     private service: EhubService, private formBuilder: FormBuilder,
      private toastr: ToastrService) {
      this.authService.isLoggedIn();
      this.loginAdmin=JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {

     this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })



    this.service.getAllEhubs().subscribe((res)=> {
      this.ehubs =res;
      console.log(res)
      for(var i= 0; i< this.ehubs.length; i++){
        if(parseInt(this.ehubs[i].id) === this.id){
            this.exist =true;
             this.entrepreObj =this.ehubs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  updateEhub(){
    const formData = new FormData();
    formData.append('ehub', JSON.stringify(this.entrepreObj));
    if(this.ehubFile){
    formData.append('file', this.ehubFile);
    }
      this.service.clearCache();
      this.service.saveEhubProfile(formData, this.loginAdmin.token)
      .subscribe(res=>{
        this.router.navigate(['/list_ehub']);
        this.toastr.success('One Ehub Update Successfully','TED EHUB')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.ehubFile =file;
 }

}
