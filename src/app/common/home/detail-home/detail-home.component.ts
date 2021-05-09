import { Application } from './../../../shared/model/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from './../../../shared/services/application.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-home',
  templateUrl: './detail-home.component.html',
  styleUrls: ['./detail-home.component.css']
})
export class DetailHomeComponent implements OnInit {

  
  id: number;
  applicants: any = [];
  data: Application ;
  exist: boolean =false;
  
  searchText: string;

  Applicant_IMAGE: string;
  constructor(private applicantService: ApplicationService, private route: ActivatedRoute,
     private router: Router) { 
    this.Applicant_IMAGE=applicantService.IMAGE_URL;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
     })
 
     this.fetchAll();
  }

  fetchAll(){
    this.applicantService.getAllApplicantions().subscribe((res)=> {
      this.applicants =res;
      for(var i= 0; i< this.applicants.length; i++){
        if(parseInt(this.applicants[i].id) === this.id){
            this.exist =true;
             this.data =this.applicants[i];
             break;
        } else{
          this.exist = false;
        }
      }
    })
  }



  refresh(){
    for(var i= 0; i< this.applicants.length; i++){
      if(parseInt(this.applicants[i].id) === this.id){
          this.exist =true;
           this.data =this.applicants[i];
           break;
      } else{
        this.exist = false;
      }
    }
  }
  

 

}
