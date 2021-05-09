import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EhubcategoryService } from './../../../../shared/services/ehubcategory.service';
import { Observable } from 'rxjs';
import { Ehubcategory } from './../../../../shared/model/ehubcategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-ehubcategory',
  templateUrl: './update-ehubcategory.component.html',
  styleUrls: ['./update-ehubcategory.component.css']
})
export class UpdateEhubcategoryComponent implements OnInit {

  ehubcategories$: Observable<Ehubcategory[]>;
  ehubcategories: any =[];
  id : number;
  exist: boolean =false;
  categoryObject :any ={}
    constructor(private ehubcategoryService: EhubcategoryService, 
      private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
      
    this.route.params.subscribe(params=>{
      this.id =+params['id'];
    })
     

    this.ehubcategories$= this.ehubcategoryService.getAllEhubehubcategories()
    this.ehubcategories$.subscribe(result=>{
      this.ehubcategories=result;
      for(var i=0; i<this.ehubcategories.length; i++){
        if(parseInt(this.ehubcategories[i].id) === this.id){
           this.exist =true;
           this.categoryObject =this.ehubcategories[i];
        }else{
          this.exist=false;
        }
      }
    })
  }


  updateEhubcategory(){
    const categoryData = new FormData();
    categoryData.append('ehubcategory', JSON.stringify(this.categoryObject))
    this.ehubcategoryService.addEhubcategory(categoryData).subscribe(result => {
      this.toastr.success("one Ehub category is updated successfully", "UPDATE EHUB CATEGORY");
      this.router.navigate(['/create_ehub_category']);
    });
  }


}
