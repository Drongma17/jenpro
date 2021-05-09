import { SbcategoryService } from './../../snowbank/service/sbcategory.service';
import { SubcategoryService } from './../../shared/services/subcategory.service';
import { Subcategory } from './../../shared/model/subcategory';
import { EhubcategoryService } from 'src/app/shared/services/ehubcategory.service';
import { BacategoryService } from './../../shared/services/bacategory.service';
import { EntrepreneursService } from './../../shared/services/entrepreneurs.service';
import { UserService } from './../../shared/services/user.service';
import { CategoryService } from './../../shared/services/category.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../shared/model/user';
import { InvestmentcategoryService } from './../../shared/services/investmentcategory.service';
import { StecategoryService } from './../../shared/services/stecategory.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.css']
})
export class NavigationsComponent implements OnInit {

  public currentStatus: any;
  public categories: any=[];
  public bacategories: any=[];
  public ehubcategories: any=[];
  public investmentcategories: any=[];
  public stecategories: any=[];
  public snowbankcategories: any=[];
  public mycategories: any=[];
  public subCatogryFound: boolean = false;

  listsubCategories$: Observable<Subcategory[]>;
  subcategorybyid: Subcategory[];


  currentUser: User;
  
   public choosedCategory :string;
  
  constructor(private authService: AuthenticationService, private router: Router,
    private subcategoryService: SubcategoryService ,
    private categoryService:CategoryService, private bacategoryService: BacategoryService,private ehubcategoryService: EhubcategoryService, 
    private userService: UserService, private entrepreneurService: EntrepreneursService,
     private investmentcategoryService: InvestmentcategoryService, private stecategoryService: StecategoryService, private snowbankCateogoryService: SbcategoryService) {
    this.currentStatus = authService.getStatus().subscribe(currentstatus => {
      this.currentStatus = currentstatus;
    })

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
    this.bacategories=this.bacategoryService.getAllBacategories();
    this.ehubcategories=this.ehubcategoryService.getAllEhubehubcategories();
    this.investmentcategories=this.investmentcategoryService.getInvestmentCategories();
    this.stecategories=this.stecategoryService.getAllSteCategories();
    this.snowbankcategories =this.snowbankCateogoryService.getAllCategories();

    this.mycategories = this.subcategoryService.getChildCategoryById(0);
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }


  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'ADMIN';
}



// listSubCategoryById(id:number){
//   this.subCatogryFound=false;
// this.listsubCategories$=this.subcategoryService.getChildCategoryById(id);
// this.listsubCategories$.subscribe(categoryList=>{
//   this.subcategorybyid=categoryList;
//   if(this.subcategorybyid.length>0){
//     this.subCatogryFound =true;
//   }
// })
// }



}
