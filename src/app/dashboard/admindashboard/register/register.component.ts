import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  public user: any ={}
  constructor(private userService: UserService, private authService: AuthenticationService,  private toastr: ToastrService, private router: Router) {
    this.authService.isLoggedIn();
   }

  ngOnInit() {
  }


   saveUser(user: any, userForm: any){
     user.enabled =true;
     if(user.email && user.password && user.password === user.confirmpassword){
     this.userService.registerUser(user).subscribe(response=>{
       if(response){
         console.log(response);
         userForm.reset();
         this.router.navigate(['/list_user'])
       }
     })
    }else {
      err =>{
        console.log("mismatch password")
      }
    }
   }

}
