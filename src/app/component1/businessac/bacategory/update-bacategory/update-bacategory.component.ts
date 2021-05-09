import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BacategoryService } from './../../../../shared/services/bacategory.service';
import { Bacategory } from './../../../../shared/model/bacategory';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-bacategory',
  templateUrl: './update-bacategory.component.html',
  styleUrls: ['./update-bacategory.component.css']
})
export class UpdateBacategoryComponent implements OnInit {

  bacategories$: Observable<Bacategory[]>;
  bacategories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
  loginAdmin: any ={};
    constructor(private authService: AuthenticationService,private bacategoryService: BacategoryService, 
      private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
        this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
       }

  ngOnInit() {
      
    this.route.params.subscribe(params=>{
      this.id =+params['id'];
    })
     

    this.bacategories$= this.bacategoryService.getAllBacategories()
    this.bacategories$.subscribe(result=>{
      this.bacategories=result;
      for(var i=0; i<this.bacategories.length; i++){
        if(parseInt(this.bacategories[i].id) === this.id){
           this.exist =true;
           this.categoryObject =this.bacategories[i];
        }else{
          this.exist=false;
        }
      }
    })
  }


  updateBacategory(){
    const categoryData = new FormData();
    categoryData.append('bacategory', JSON.stringify(this.categoryObject))
    this.bacategoryService.addBacategory(categoryData, this.loginAdmin.token).subscribe(result => {
      this.toastr.success("one BA category is updated successfully", "UPDATE BA CATEGORY");
      this.router.navigate(['/create_ba_category']);
    });
  }


}
