import { UserService } from '../../shared/services/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  public loginUser: any={}
  public user : any ={}

  constructor(private authService: AuthenticationService, private userService: UserService) {
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
   }
  ngOnInit() {
    this.userService.getUser(this.loginUser.token).subscribe(user=>{
      this.user = user;
       }, err=>{
         console.log(err)
       })
  }

}
