import { ActivatedRoute } from '@angular/router';
import { SteService } from './../../../shared/services/ste.service';
import { Ste } from './../../../shared/model/ste';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-ste',
  templateUrl: './all-ste.component.html',
  styleUrls: ['./all-ste.component.css']
})
export class AllSteComponent implements OnInit {

 
  stes$: Observable<Ste[]>;
  stes: Ste[];
  public ste_IMAGE: string;
  searchSte: string;
  
 
  constructor(private steService: SteService,
    private route: ActivatedRoute) {
    this.ste_IMAGE=steService.IMAGE_URL;
   }


  ngOnInit() {
    this.route.paramMap.subscribe( param => {
       this.steService.getSteByCategoryName(param.get('steCategoryName'))
      .subscribe(result => {
        this.stes = result;
    });
    })
  }


}
