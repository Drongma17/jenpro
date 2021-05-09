import { ActivatedRoute } from '@angular/router';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { Businessac } from './../../../shared/model/businessac';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badetail',
  templateUrl: './badetail.component.html',
  styleUrls: ['./badetail.component.css']
})
export class BadetailComponent implements OnInit {

  businessacs$: Observable<Businessac[]>;
  businessacs: Businessac[];
  public businessac_IMAGE: string;
  searchBusinessac: string;
  
 
  constructor(private businessacService: BusinessacService,
    private route: ActivatedRoute) {
    this.businessac_IMAGE=businessacService.IMAGE_URL;
   }

  ngOnInit() {
    this.route.paramMap.subscribe( param => {
       this.businessacService.getBusinessacByCategory(param.get('baCategoryName'))
      .subscribe(result => {
        this.businessacs = result;
    });
    })
  }

   

}
