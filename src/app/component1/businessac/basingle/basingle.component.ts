import { Businessac } from './../../../shared/model/businessac';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basingle',
  templateUrl: './basingle.component.html',
  styleUrls: ['./basingle.component.css']
})
export class BasingleComponent implements OnInit {

  id: number;
  businessacs: any = [];
  data: Businessac;
  exist: boolean =false;
  
  searchText: string;

  businessac_IMAGE: string;
  constructor(private businessacService: BusinessacService, private route: ActivatedRoute,
     private router: Router) { 
    this.businessac_IMAGE=businessacService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.businessacService.getAllBusinessac().subscribe((res)=> {
      this.businessacs =res;
      for(var i= 0; i< this.businessacs.length; i++){
        if(parseInt(this.businessacs[i].id) === this.id){
            this.exist =true;
             this.data =this.businessacs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  refresh(){
    for(var i= 0; i< this.businessacs.length; i++){
      if(parseInt(this.businessacs[i].id) === this.id){
          this.exist =true;
           this.data =this.businessacs[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  

 

}
