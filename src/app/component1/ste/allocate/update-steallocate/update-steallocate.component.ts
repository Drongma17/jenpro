import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Steallocate } from './../../../../shared/model/steallocate';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SteallocateService } from './../../../../shared/services/steallocate.service';
import { SteService } from './../../../../shared/services/ste.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-steallocate',
  templateUrl: './update-steallocate.component.html',
  styleUrls: ['./update-steallocate.component.css']
})
export class UpdateSteallocateComponent implements OnInit {

  stes: any = [];
  stePicture: string;
  selectedSteId: number;
  searchste: string;
  steallocates: any=[];
  id: number;
  exist: boolean=false;
  data: Steallocate;
  stefinanceId: number;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private steService: SteService, private steAllocateService: SteallocateService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router) {
    this.stePicture=steService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
    this.getAllStes();
    this.getAllSTEAllocates();
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


  getAllSTEAllocates(){
    this.steAllocateService.getAllSteAllocate().subscribe(response=>{
    this.steallocates = response;
    for(var i=0; i<this.steallocates.length; i++){
      if(parseInt(this.steallocates[i].id)===this.id){
        this.exist =true;
       this.data = this.steallocates[i];
       this.stefinanceId =parseInt(this.steallocates[i].id);
      }else {
        this.exist =false;
      }
    }
    })
  }




updateSteAllocate(data: Steallocate){
  this.steAllocateService.updateSteAllocate(this.selectedSteId, this.stefinanceId, this.data, this.loginAdmin.token).subscribe(response=>{
   this.toastr.success("one allocated of ste is updated successfully", "STE ALLOCATION");
   this.router.navigate(['/list_ste_allocate']);
  })
}



}
