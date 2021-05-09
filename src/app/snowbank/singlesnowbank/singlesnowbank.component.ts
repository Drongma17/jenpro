import { Snowbank } from './../model/snowbank';
import { ActivatedRoute, Router } from '@angular/router';
import { SnowbankService } from './../service/snowbank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singlesnowbank',
  templateUrl: './singlesnowbank.component.html',
  styleUrls: ['./singlesnowbank.component.css']
})
export class SinglesnowbankComponent implements OnInit {

  id: number;
  snowbanks: any = [];
  data: Snowbank;
  exist: boolean =false;
  
  searchText: string;

  Snowbank_IMAGE: string;
  constructor(private snowbankService: SnowbankService, private route: ActivatedRoute,
     private router: Router) { 
    this.Snowbank_IMAGE=snowbankService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }


  fetchAll(){
    this.snowbankService.getAllSnowbanks().subscribe((res)=> {
      this.snowbanks =res;
      for(var i= 0; i< this.snowbanks.length; i++){
        if(parseInt(this.snowbanks[i].id) === this.id){
            this.exist =true;
             this.data =this.snowbanks[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }

}
