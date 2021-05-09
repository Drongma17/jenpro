import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { Ehuballocate } from './../../../../shared/model/ehuballocate';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EhuballocateService } from './../../../../shared/services/ehuballocate.service';
import { EhubService } from 'src/app/shared/services/ehub.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-ehuballocate',
  templateUrl: './update-ehuballocate.component.html',
  styleUrls: ['./update-ehuballocate.component.css']
})
export class UpdateEhuballocateComponent implements OnInit {
  ehubs: any = [];
  ehubPicture: string;
  selectedEhubId: number;
  ehuballocates: any = [];
  id: number;
  exist: boolean = false;
  data: Ehuballocate;
  ehuballocateId: number;
  searchehub:string;
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private ehubService: EhubService, private ehuballocateService: EhuballocateService, 
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.ehubPicture = ehubService.IMAGE_URL;
    this.authService.isLoggedIn();
    this.loginAdmin =JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getAllEhubs();
    this.getEhubAllocateOfSelected();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }


  getAllEhubs() {
    this.ehubService.getAllEhubs().subscribe(listehubs => {
      this.ehubs = listehubs;
    })
  }

  selectedEhub(ehubid: number) {
    this.selectedEhubId = ehubid;
  }


  getColor(id) {
    switch (id) {
      case this.selectedEhubId:
        return 'green';

      case !this.selectedEhubId:
        return 'blue';
    }
  }


  getEhubAllocateOfSelected() {
    this.ehuballocateService.getAllEhubAllocatedfind().subscribe(listehuballocates => {
      this.ehuballocates = listehuballocates;
      for (var i = 0; i < this.ehuballocates.length; i++) {
        if (parseInt(this.ehuballocates[i].id) === this.id) {
          this.data = this.ehuballocates[i];
          this.exist = true;
          this.ehuballocateId = parseInt(this.ehuballocates[i].id);
        } else {
          this.exist = false;
        }
      }
    })
  }



  updateEhubAllocate(data:Ehuballocate) {
   this.ehuballocateService.updateEhubAllocate(this.selectedEhubId,  this.ehuballocateId, this.data, this.loginAdmin.token).subscribe(response=>{
    this.toastr.success("ehub allocated is updated successfully", "EHUB ALLOCATED");
    this.router.navigate(['/list_ehub_allocate']);
   })
  }




}
