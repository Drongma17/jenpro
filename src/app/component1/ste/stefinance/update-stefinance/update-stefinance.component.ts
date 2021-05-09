import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Stefinance } from './../../../../shared/model/stefinance';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StefinanceService } from './../../../../shared/services/stefinance.service';
import { SteService } from './../../../../shared/services/ste.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-update-stefinance',
  templateUrl: './update-stefinance.component.html',
  styleUrls: ['./update-stefinance.component.css']
})
export class UpdateStefinanceComponent implements OnInit {

  stes: any = [];
  stePicture: string;
  selectedSteId: number;
  searchste: string;
  stefinances: any=[];
  id: number;
  exist: boolean=false;
  data: Stefinance;
  stefinanceId: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private stefinanceService: StefinanceService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router) {
    this.stePicture=steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
	
   }

  ngOnInit() {
    this.getAllStes();
    this.getAllSTEfinances();
    this.route.params.subscribe(param=>{
      this.id =+param['id'];
    })
  }


  getAllStes() {
    this.steService.getAllStes().subscribe(liststes => {
      this.stes = liststes;
    })
  }


  selectedste(steId: number){
   this.selectedSteId=steId;
  }

  getColor(id){
    switch(id){
      case this.selectedSteId:
        return 'green';

      case !this.selectedSteId:
        return 'blue';  
    }
  }


  getAllSTEfinances(){
    this.stefinanceService.getAllSTEfinances().subscribe(response=>{
    this.stefinances = response;
    for(var i=0; i<this.stefinances.length; i++){
      if(parseInt(this.stefinances[i].id)===this.id){
        this.exist =true;
       this.data = this.stefinances[i];
       this.stefinanceId =parseInt(this.stefinances[i].id);
      }else {
        this.exist =false;
      }
    }
    })
  }




updateStefinance(data: Stefinance){
  this.stefinanceService.updatestefinance(this.selectedSteId, this.stefinanceId, this.data, this.loginAdmin.token).subscribe(response=>{
   this.toastr.success("one milestone of ste is updated successfully", "STE FINANCE");
   this.router.navigate(['/list_ste_finance']);
  })
}





}
