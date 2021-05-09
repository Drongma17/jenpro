import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {}

  constructor(private router: Router,
    private authService: AuthenticationService, private userService: UserService) {
    this.authService.isLoggedIn();
  }

  ngOnInit() { }

  message: string;
  loginUser(user: any) {
    this.userService.loginUser(user).subscribe(response => {
      if (response) {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          if (response.user.role === "ADMIN") {
            this.router.navigate(['/list_user']);
          } else {
            this.router.navigate(['/userdashboard']);
          }
        }
      }
    });
  }
}

