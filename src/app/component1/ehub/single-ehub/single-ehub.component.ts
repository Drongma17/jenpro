import { Ehub } from './../../../shared/model/ehub';
import { ActivatedRoute, Router } from '@angular/router';
import { EhubService } from './../../../shared/services/ehub.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-ehub',
  templateUrl: './single-ehub.component.html',
  styleUrls: ['./single-ehub.component.css']
})
export class SingleEhubComponent implements OnInit {

  id: number;
  ehubs: any = [];
  data: Ehub;
  exist: boolean =false;
  
  searchText: string;

  ehub_IMAGE: string;
  constructor(private ehubService: EhubService, private route: ActivatedRoute,
     private router: Router) { 
    this.ehub_IMAGE=ehubService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.ehubService.getAllEhubs().subscribe((res)=> {
      this.ehubs =res;
      for(var i= 0; i< this.ehubs.length; i++){
        if(parseInt(this.ehubs[i].id) === this.id){
            this.exist =true;
             this.data =this.ehubs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }


  

  refresh(){
    for(var i= 0; i< this.ehubs.length; i++){
      if(parseInt(this.ehubs[i].id) === this.id){
          this.exist =true;
           this.data =this.ehubs[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  

 

}
