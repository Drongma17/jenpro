import { Ehub } from 'src/app/shared/model/ehub';
import { ActivatedRoute, Router } from '@angular/router';
import { EhubService } from 'src/app/shared/services/ehub.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-ehub',
  templateUrl: './detail-ehub.component.html',
  styleUrls: ['./detail-ehub.component.css']
})
export class DetailEhubComponent implements OnInit {

  id: number;
  ehubs: any = [];
  data:Ehub ;
  exist: boolean =false;
  
  searchehub: string;

  ehubFile: string;
  constructor(private ehubService: EhubService, private route: ActivatedRoute, private router: Router) { 
    this.ehubFile=ehubService.IMAGE_URL;
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
