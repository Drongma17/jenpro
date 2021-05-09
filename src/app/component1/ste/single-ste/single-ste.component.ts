import { Ste } from './../../../shared/model/ste';
import { ActivatedRoute, Router } from '@angular/router';
import { SteService } from './../../../shared/services/ste.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-ste',
  templateUrl: './single-ste.component.html',
  styleUrls: ['./single-ste.component.css']
})
export class SingleSteComponent implements OnInit {

  
  id: number;
  stes: any = [];
  data:Ste;
  exist: boolean =false;
  
  searchText: string;

  ste_IMAGE: string;
  constructor(private steService: SteService, private route: ActivatedRoute,
     private router: Router) { 
    this.ste_IMAGE=steService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.steService.getAllStes().subscribe((res)=> {
      this.stes =res;
      for(var i= 0; i< this.stes.length; i++){
        if(parseInt(this.stes[i].id) === this.id){
            this.exist =true;
             this.data =this.stes[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  refresh(){
    for(var i= 0; i< this.stes.length; i++){
      if(parseInt(this.stes[i].id) === this.id){
          this.exist =true;
           this.data =this.stes[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  

 

}
