import { Snowbank } from './../../model/snowbank';
import { ActivatedRoute, Router } from '@angular/router';
import { SnowbankService } from './../../service/snowbank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {

  id: number;
  snowbanks: any = [];
  public data: Snowbank;
  exist: boolean =false;
  
  searchText: string;

  snowbank_IMAGE: string;
  constructor(private snowbankService: SnowbankService, private route: ActivatedRoute, private router: Router) { 
    this.snowbank_IMAGE=snowbankService.IMAGE_URL;
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



  refresh(){
    for(var i= 0; i< this.snowbanks.length; i++){
      if(parseInt(this.snowbanks[i].id) === this.id){
          this.exist =true;
           this.data =this.snowbanks[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  



}
