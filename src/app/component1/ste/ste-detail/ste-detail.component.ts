import { Ste } from './../../../shared/model/ste';
import { ActivatedRoute, Router } from '@angular/router';
import { SteService } from './../../../shared/services/ste.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ste-detail',
  templateUrl: './ste-detail.component.html',
  styleUrls: ['./ste-detail.component.css']
})
export class SteDetailComponent implements OnInit {

  id: number;
  stes: any = [];
  data:Ste;
  exist: boolean =false;
  
  searchSte: string;

  steFile: string;
  constructor(private steService: SteService, private route: ActivatedRoute, private router: Router) { 
    this.steFile=steService.IMAGE_URL;
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
