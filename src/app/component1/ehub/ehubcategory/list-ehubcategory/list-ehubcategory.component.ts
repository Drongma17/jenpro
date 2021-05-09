import { Router } from '@angular/router';
import { EhubcategoryService } from 'src/app/shared/services/ehubcategory.service';
import { Ehubcategory } from './../../../../shared/model/ehubcategory';
import { EhubService } from './../../../../shared/services/ehub.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Ehubfinance, Ehub } from 'src/app/shared/model/ehub';
import { EhubfinanceService } from 'src/app/shared/services/ehubfinance.service';

@Component({
  selector: 'app-list-ehubcategory',
  templateUrl: './list-ehubcategory.component.html',
  styleUrls: ['./list-ehubcategory.component.css']
})
export class ListEhubcategoryComponent implements OnInit {

  ehubcategories$: Observable<Ehubcategory[]>
  ehubcategories: any=[];
  constructor(private ehubcategoryService: EhubcategoryService, private router: Router) { }

  ngOnInit() {
   this.getehubCategories();
  }


  getehubCategories(){
    this.ehubcategoryService.clearCache();
    this.ehubcategories$= this.ehubcategoryService.getAllEhubehubcategories()
    this.ehubcategories$.subscribe(result=>{
      this.ehubcategories=result;
    })
  }


  deleteehubCategory(id: any) {
    if (confirm("Are you sure to delete this category ?")) {
      return this.ehubcategoryService.deleteEhubcategory(id).subscribe(result=>
        {
          this.ehubcategoryService.clearCache();
          this.ehubcategories$=this.ehubcategoryService.getAllEhubehubcategories();
          this.ehubcategories$.subscribe(newList=>
            {
              this.ehubcategories=newList;
            })
            this.router.navigate(['/list_ehub'])
        })
    }
  }


}
