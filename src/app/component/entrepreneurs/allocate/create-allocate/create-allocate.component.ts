import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncubationallotService } from './../../../../shared/services/incubationallot.service';
import { Entrepreneurs } from './../../../../shared/model/entrepreneurs';
import { EntrepreneursService } from './../../../../shared/services/entrepreneurs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-allocate',
  templateUrl: './create-allocate.component.html',
  styleUrls: ['./create-allocate.component.css']
})
export class CreateAllocateComponent implements OnInit {

  preneurs: any = [];
  public finance: any ={}
  selectedEntrepreneurId: number;
  public entrepreneurObject: Entrepreneurs;
  entrepreneurPicture: string;
  searchEntrepreneur: string;
  loginUser: any={}
  constructor(private authService: AuthenticationService ,private incubationallotService: IncubationallotService, private route: ActivatedRoute, 
     private toastr: ToastrService, private entrepreneurService: EntrepreneursService, private router: Router) { 
      this.entrepreneurPicture =entrepreneurService.IMAGE_URL;
       this.authService.isLoggedIn();
       this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
    this.getAllEntrepreneur();
  }



  selectedEnterp(entrepreneurId : number){
    this.selectedEntrepreneurId = entrepreneurId;
  }

  
getAllEntrepreneur(){
  this.entrepreneurService.getAllEntrepreneurs().subscribe(response=>{
    this.preneurs =response;
  })
}



  addAllocatedFinance(finance:any, allocatefinanceForm: any){
    this.incubationallotService.saveallocattoincubation(this.selectedEntrepreneurId, finance, this.loginUser.token).subscribe(resp=>{
      this.toastr.success('the amount is added successfully', 'PRE-INCUBATION ALLOCATE FINANCE');
      this.router.navigate(['/list_incubation_allocate'])
    })
    allocatefinanceForm.reset();
    }


  
    getColor(id){
      switch(id){
        case this.selectedEntrepreneurId:
          return 'green';
        case !this.selectedEntrepreneurId:
          return 'blue'  
      }
    }

  }




 

