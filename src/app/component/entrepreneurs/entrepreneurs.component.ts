import { Entrepreneurs } from './../../shared/model/entrepreneurs';
import { EntrepreneursService } from './../../shared/services/entrepreneurs.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import {ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-entrepreneurs',
  templateUrl: './entrepreneurs.component.html',
  styleUrls: ['./entrepreneurs.component.css']
})
export class EntrepreneursComponent implements OnInit {

  entrepreneurs$: Observable<Entrepreneurs[]>;
  entrepreneurs: Entrepreneurs[];
  public Entrepreneur_IMAGE: string;
  searchincubation: string;

 
  constructor(private entrepreneurService: EntrepreneursService,
    private route: ActivatedRoute) {
    this.Entrepreneur_IMAGE=entrepreneurService.IMAGE_URL;
   }

  ngOnInit() {
    this.getCategoriest();
  }


  getCategoriest(){
    this.route.paramMap.subscribe(param => {
      this.entrepreneurService.getEntrepreneursByCategory(param.get('categoryName'))
     .subscribe(result => {
       this.entrepreneurs = result;
   });
   })
  }
   





}
