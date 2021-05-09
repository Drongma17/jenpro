import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { InvestmentcategoryService } from './../../../../shared/services/investmentcategory.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Investmentcategory } from 'src/app/shared/model/investmentcategory';

@Component({
  selector: 'app-list-investmentcategory',
  templateUrl: './list-investmentcategory.component.html',
  styleUrls: ['./list-investmentcategory.component.css']
})
export class ListInvestmentcategoryComponent implements OnInit {

  
  investmentcategories$: Observable<Investmentcategory[]>
  investmentcategories: any=[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private investmentcategoryService: InvestmentcategoryService, private router: Router) {
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
   this.getInvestmentCategories();
  }


  getInvestmentCategories(){
    this.investmentcategoryService.clearCache();
    this.investmentcategories$= this.investmentcategoryService.getInvestmentCategories()
    this.investmentcategories$.subscribe(result=>{
      this.investmentcategories=result;
    })
  }


  deleteInvestmentCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.investmentcategoryService.deleteInvestmentCategory(id, this.loginAdmin.token).subscribe(result=>
        {
          this.investmentcategoryService.clearCache();
          this.investmentcategories$=this.investmentcategoryService.getInvestmentCategories();
          this.investmentcategories$.subscribe(newList=>
            {
              this.investmentcategories=newList;
            })
            this.router.navigate(['/list_investment_category'])
        })
    }
  }


}
