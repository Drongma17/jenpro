import { ToastrService } from 'ngx-toastr';
import { User } from './../../../shared/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {


  id: number;
  users: any=[];
  exist: boolean=false;
  userObject: User;
  public eventFile : File;
  loginAdmin:any ={};
  public user: any ={}
  constructor(private authService: AuthenticationService,private route: ActivatedRoute,private router: Router,
    private userService: UserService, private toastr: ToastrService) {
      this.authService.isLoggedIn();
      this.loginAdmin = JSON.parse(localStorage.getItem('currentUser'))
      }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['user_id'];
    })

    this.userService.getAllUsers(this.loginAdmin.token).subscribe(response=>{
      this.users =response; 
      for(var i=0; i<this.users.length; i++){
         if(parseInt(this.users[i].user_id) === this.id){
           this.userObject = this.users[i];
           this.userObject.password = "";
           this.exist =true;
           break;
         }else{
           this.exist =false;
         }
      }   
    })
  }


  updateUser(userForm:User){
    this.userService.registerUser(userForm).subscribe(response=>{
      if(response){
        console.log(response);
        this.router.navigate(['/list_user'])
      }
    })
}

onSelectFile(event){
  const file=event.target.files[0];
  this.eventFile = file;
}

}









 

 
  


