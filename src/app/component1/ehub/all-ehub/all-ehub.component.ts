import { ActivatedRoute } from '@angular/router';
import { EhubService } from './../../../shared/services/ehub.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Ehub } from 'src/app/shared/model/ehub';

@Component({
  selector: 'app-all-ehub',
  templateUrl: './all-ehub.component.html',
  styleUrls: ['./all-ehub.component.css']
})
export class AllEhubComponent implements OnInit {

  ehubs$: Observable<Ehub[]>;
  ehubs: Ehub[];
  public ehub_IMAGE: string;
  searchEhub: string;
  
 
  constructor(private ehubService: EhubService,
    private route: ActivatedRoute) {
    this.ehub_IMAGE=ehubService.IMAGE_URL;
   }


  ngOnInit() {
    this.route.paramMap.subscribe( param => {
       this.ehubService.getEhubByCategoryName(param.get('ehubCategoryName'))
      .subscribe(result => {
        this.ehubs = result;
    });
    })
  }


}
