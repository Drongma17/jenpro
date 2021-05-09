import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentcategoryService } from './../../../../shared/services/investmentcategory.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Investmentcategory } from 'src/app/shared/model/investmentcategory';

@Component({
  selector: 'app-update-investmentcategory',
  templateUrl: './update-investmentcategory.component.html',
  styleUrls: ['./update-investmentcategory.component.css']
})
export class UpdateInvestmentcategoryComponent implements OnInit {

  investmentcategories$: Observable<Investmentcategory[]>;
  investmentcategories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
  loginAdmin: any ={};
    constructor(private authService: AuthenticationService,private investmentcategoryService: InvestmentcategoryService, 
      private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
        this.authService.isLoggedIn();
        this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
      
    this.route.params.subscribe(params=>{
      this.id =+params['id'];
    })
     

    this.investmentcategories$= this.investmentcategoryService.getInvestmentCategories()
    this.investmentcategories$.subscribe(result=>{
      this.investmentcategories=result;
      for(var i=0; i<this.investmentcategories.length; i++){
        if(parseInt(this.investmentcategories[i].id) === this.id){
           this.exist =true;
           this.categoryObject =this.investmentcategories[i];
        }else{
          this.exist=false;
        }
      }
    })
  }


  updateinvestmentcategory(){
    const categoryData = new FormData();
    categoryData.append('investmentCategory', JSON.stringify(this.categoryObject))
    this.investmentcategoryService.addInvestmentCategory(categoryData, this.loginAdmin.token).subscribe(result => {
      this.toastr.success("one Investment category is updated successfully", "UPDATE INVESTMENT CATEGORY");
      this.router.navigate(['/create_investment_category']);
    });
  }


}
