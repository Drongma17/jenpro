import { Businessac } from './../../../shared/model/businessac';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessacService } from './../../../shared/services/businessac.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-businessac',
  templateUrl: './detail-businessac.component.html',
  styleUrls: ['./detail-businessac.component.css']
})
export class DetailBusinessacComponent implements OnInit {
  
  id: number;
  businessacs: any = [];
  data:Businessac;
  exist: boolean =false;
  
  searchbusinessac: string;

  businessacFile: string;
  constructor(private businessacService: BusinessacService, private route: ActivatedRoute, private router: Router) { 
    this.businessacFile=businessacService.IMAGE_URL;
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
