import { ActivatedRoute } from '@angular/router';
import { SnowbankService } from './../service/snowbank.service';
import { Observable } from 'rxjs';
import { Snowbank } from './../model/snowbank';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allsnowbank',
  templateUrl: './allsnowbank.component.html',
  styleUrls: ['./allsnowbank.component.css']
})
export class AllsnowbankComponent implements OnInit {
  

  snowbanks$: Observable<Snowbank[]>;
  snowbanks: Snowbank[];
  public snowbank_IMAGE: string;
  searchsnowbank: string;

 
  constructor(private snowbankService: SnowbankService,
    private route: ActivatedRoute) {
    this.snowbank_IMAGE=snowbankService.IMAGE_URL;
   }

  ngOnInit() {
    this.getCategoriest();
  }


  getCategoriest(){
    this.route.paramMap.subscribe(param => {
      this.snowbankService.getSnowbankByCategoryName(param.get('sbCategoryName'))
     .subscribe(result => {
       this.snowbanks = result;
       console.log(this.snowbanks)
   });
   })
  }

}
