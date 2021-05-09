import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Incuallocate } from './../../../../shared/model/incuallocate';
import { EntrepreneursService } from './../../../../shared/services/entrepreneurs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncubationallotService } from './../../../../shared/services/incubationallot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-allocate',
  templateUrl: './update-allocate.component.html',
  styleUrls: ['./update-allocate.component.css']
})
export class UpdateAllocateComponent implements OnInit {

  allocatefinances: any=[];
  data: Incuallocate ;
  id: number;
  exist: boolean =false;
  fid: number;
  financeId: number;
  entrepreneurPicture: string;
  preneurs: any[];
  selectedEntrepreneurId: number;
  searchEntrepreneur: string;
  loginAdmin: any={}
  constructor(private authService: AuthenticationService,private incubationallotService: IncubationallotService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private entrepreneurService: EntrepreneursService) {
      this.entrepreneurPicture =entrepreneurService.IMAGE_URL;
      this.loginAdmin=JSON.parse(localStorage.getItem('currentUser'))
     }

  ngOnInit() {
      this.getAllPreincubations();
      this.getAllIncubationAllots();
     this.route.params.subscribe(params=>{
      this.id=+params['id'];
    })
  }



  getAllPreincubations(){
    this.entrepreneurService.getAllEntrepreneurs().subscribe(response=>{
      this.preneurs = response;
      })
  }



  getColor(id){
    switch(id){
      case this.selectedEntrepreneurId:
        return 'green';
        
      case !this.selectedEntrepreneurId:
        return 'blue'  
    }
  }



  
  getAllIncubationAllots(){
     this.incubationallotService.getAllIncubationAllocation().subscribe(listOfFinances=>{
       this.allocatefinances = listOfFinances;
       for(var i=0; i<this.allocatefinances.length; i++){
        if(parseInt(this.allocatefinances[i].id) === this.id){
         this.exist =true;
         this.data =this.allocatefinances[i];
         this.fid=parseInt(this.allocatefinances[i].id)
         break;
        }else{
          this.exist = false;
        }
       }
     })
  }

  
  
  updateallocateFinance(data:Incuallocate){
    this.incubationallotService.updateallocateofincubation(this.selectedEntrepreneurId, this.fid, this.data, this.loginAdmin.token).subscribe(resp=>{
      this.toastr.success('the amount is updated successfully', 'INCUBATION ALLOCATE FINANCE');
      this.router.navigate(['/list_finance'])
    })
    }


    selectedEnterp(entrepreneurId : number){
      this.selectedEntrepreneurId = entrepreneurId;
    }
  


   
 
    
}
