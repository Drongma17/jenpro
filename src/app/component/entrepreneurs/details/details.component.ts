import { EntrepreneursService } from './../../../shared/services/entrepreneurs.service';
import { Entrepreneurs } from './../../../shared/model/entrepreneurs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number;
  entrepreneurs: any = [];
  data:Entrepreneurs;
  exist: boolean =false;
  
  searchText: string;

  Entrepreneur_IMAGE: string;
  constructor(private entrepreneurService: EntrepreneursService, private route: ActivatedRoute, private router: Router) { 
    this.Entrepreneur_IMAGE=entrepreneurService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.entrepreneurService.getAllEntrepreneurs().subscribe((res)=> {
      this.entrepreneurs =res;
      for(var i= 0; i< this.entrepreneurs.length; i++){
        if(parseInt(this.entrepreneurs[i].id) === this.id){
            this.exist =true;
             this.data =this.entrepreneurs[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  refresh(){
    for(var i= 0; i< this.entrepreneurs.length; i++){
      if(parseInt(this.entrepreneurs[i].id) === this.id){
          this.exist =true;
           this.data =this.entrepreneurs[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  
}
