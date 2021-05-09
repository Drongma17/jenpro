import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { BacategoryService } from './../../../../shared/services/bacategory.service';
import { Bacategory } from './../../../../shared/model/bacategory';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bacategory',
  templateUrl: './list-bacategory.component.html',
  styleUrls: ['./list-bacategory.component.css']
})
export class ListBacategoryComponent implements OnInit {

 
  bacategories$: Observable<Bacategory[]>
  bacategories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private bacategoryService: BacategoryService, private router: Router) {
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
   this.getBacategories();
  }


  getBacategories(){
    this.bacategoryService.clearCache();
    this.bacategories$= this.bacategoryService.getAllBacategories()
    this.bacategories$.subscribe(result=>{
      this.bacategories=result;
    })
  }


  deleteBaCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.bacategoryService.deleteBacategory(id, this.loginAdmin.token).subscribe(result=>
        {
          this.bacategoryService.clearCache();
          this.bacategories$=this.bacategoryService.getAllBacategories();
          this.bacategories$.subscribe(newList=>
            {
              this.bacategories=newList;
            })
            this.router.navigate(['/list_ba_category'])
        })
    }
  }


}
