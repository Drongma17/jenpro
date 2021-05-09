import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StecategoryService } from './../../../../shared/services/stecategory.service';
import { Stecategory } from './../../../../shared/model/stecategory';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-stecategory',
  templateUrl: './update-stecategory.component.html',
  styleUrls: ['./update-stecategory.component.css']
})
export class UpdateStecategoryComponent implements OnInit {

  stecategories$: Observable<Stecategory[]>;
  stecategories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
  loginAdmin: any ={};
    constructor(private authService: AuthenticationService,private stecategoryService: StecategoryService, 
      private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
        this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
      
    this.route.params.subscribe(params=>{
      this.id =+params['id'];
    })
     

    this.stecategories$= this.stecategoryService.getAllSteCategories()
    this.stecategories$.subscribe(result=>{
      this.stecategories=result;
      for(var i=0; i<this.stecategories.length; i++){
        if(parseInt(this.stecategories[i].id) === this.id){
           this.exist =true;
           this.categoryObject =this.stecategories[i];
        }else{
          this.exist=false;
        }
      }
    })
  }


  updatestecategory(){
    const categoryData = new FormData();
    categoryData.append('stecategory', JSON.stringify(this.categoryObject))
    this.stecategoryService.addSteCategory(categoryData, this.loginAdmin.token).subscribe(result => {
      this.toastr.success("one Ehub category is updated successfully", "UPDATE EHUB CATEGORY");
      this.router.navigate(['/create_ste_category']);
    });
  }


}
