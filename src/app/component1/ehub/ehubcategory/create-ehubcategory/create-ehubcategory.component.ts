import { Ehubcategory } from './../../../../shared/model/ehubcategory';
import { Observable } from 'rxjs';
import { EhubService } from 'src/app/shared/services/ehub.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EhubcategoryService } from 'src/app/shared/services/ehubcategory.service';

@Component({
  selector: 'app-create-ehubcategory',
  templateUrl: './create-ehubcategory.component.html',
  styleUrls: ['./create-ehubcategory.component.css']
})
export class CreateEhubcategoryComponent implements OnInit {


  ehubcategoryForm: FormGroup;
  constructor(private formBuider: FormBuilder, private ehubcategoryService: EhubcategoryService,
    private router: Router, private toastr: ToastrService, private ehubService: EhubService) {
    this.ehubcategoryForm = this.formBuider.group({
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    })
  }

  ngOnInit() {
    this.listCategory();
  }



  saveEhubcategory(submitForm: FormGroup) {
    if (submitForm.valid) {
      const submitCategory = submitForm.value;
      const categoryData = new FormData();
      categoryData.append('ehubcategory', JSON.stringify(submitCategory))
      this.ehubcategoryService.addEhubcategory(categoryData).subscribe(result => {
        this.toastr.success("new ehub category created successfully", "ADD EHUB CATEGORY");
        this.ehubService.refreshList();
        this.router.navigate(['/create_ehub']);
      });
    }
  }



  listehubcategories$: Observable<Ehubcategory[]>;
  ehubcategories: Ehubcategory[];
  listCategory() {
    this.listehubcategories$ = this.ehubcategoryService.getAllEhubehubcategories();
    this.listehubcategories$.subscribe(categoryList => {
      this.ehubcategories = categoryList;
    })
  }

}
