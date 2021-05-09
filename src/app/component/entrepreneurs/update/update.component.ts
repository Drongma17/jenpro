import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Observable } from 'rxjs';
import { Category } from './../../../shared/model/category';
import { CategoryService } from './../../../shared/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Entrepreneurs } from '../../../shared/model/entrepreneurs';
import { EntrepreneursService } from '../../../shared/services/entrepreneurs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  id: number;
  preneurs: any = [];
  exist: boolean =false;
  public entrepreneurFile : File;
  public entrepreneurReactiveForm: FormGroup;
  public entrepreObj: Entrepreneurs;
  private entrepreneur$ : Entrepreneurs[];
  public categories: Observable<Category[]>;
  loginUser: any ={}
  constructor(private authService: AuthenticationService,private router: Router,private route: ActivatedRoute,
     private service: EntrepreneursService, private formBuilder: FormBuilder,
      private toastr: ToastrService, private categoryService: CategoryService) {
        this.authService.isLoggedIn();
        this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
      this.categories = this.categoryService.getAllCategories();

      this.route.params.subscribe(params=>{
     this.id=+params['id'];
    })




    this.service.getAllEntrepreneurs().subscribe((res)=> {
      this.preneurs =res;
      console.log(res)
      for(var i= 0; i< this.preneurs.length; i++){
        if(parseInt(this.preneurs[i].id) === this.id){
            this.exist =true;
             this.entrepreObj =this.preneurs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  updateEntrepreneur(){
    const formData = new FormData();
    formData.append('entrepre', JSON.stringify(this.entrepreObj));
    if(this.entrepreneurFile){
    formData.append('file', this.entrepreneurFile);
    }
      this.service.clearCache();
      this.service.saveEntrepreneurProfile(formData, this.loginUser.token)
      .subscribe(res=>{
        this.router.navigate(['/list_pre_incubation']);
        this.toastr.success('One Entrepreneur Update Successfully','TED ENTREPRENEURE')
       })
  }
  

  onSelectFile(event){
    const file = event.target.files[0];
   this.entrepreneurFile =file;
 }



}
