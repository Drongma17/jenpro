import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Guest } from 'src/app/shared/model/guest';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../../shared/services/guest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-guest',
  templateUrl: './update-guest.component.html',
  styleUrls: ['./update-guest.component.css']
})
export class UpdateGuestComponent implements OnInit {


  id: number;
  guests: any = [];
  exist: boolean = false;
  public guestFile: File;
  public guestObject: Guest;
  private gallery$: Guest[];
  loginAdmin: any ={};
  constructor(private authService: AuthenticationService,private router: Router, private route: ActivatedRoute,
    private service: GuestService, private formBuilder: FormBuilder,
    private toastr: ToastrService) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });



    this.service.getAllGuests().subscribe((res) => {
      this.guests = res;
      console.log(res)
      for (var i = 0; i < this.guests.length; i++) {
        if (parseInt(this.guests[i].id) === this.id) {
          this.exist = true;
          this.guestObject = this.guests[i];
          break;
        } else {
          this.exist = false;
        }
      }
    })
  }



  updateGuestForm() {
    const formData = new FormData();
    formData.append('guest', JSON.stringify(this.guestObject));
    if (this.guestFile) {
      formData.append('file', this.guestFile);
    }
    this.service.clearCache();
    this.service.saveGuest(formData, this.loginAdmin.token)
      .subscribe(res => {
        this.toastr.success('One guest updated successfully', 'TED GUEST')
        this.router.navigate(['/list_guest'])
      })
  }


  onSelectFile(event) {
    const file = event.target.files[0];
    this.guestFile = file;
  }


}
