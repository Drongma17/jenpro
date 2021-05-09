import { User } from './../../../shared/model/user';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from './../../../shared/services/user.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> =new Subject();
  @ViewChild(DataTableDirective, { static: true }) dtElement : DataTableDirective;
  
    public loginUser: any={}
    public users : any =[]
  
    constructor(private authService: AuthenticationService, private userService: UserService, private chadr: ChangeDetectorRef, private route: Router) {
      this.authService.isLoggedIn();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'))
     }
  
  
    ngOnInit() {
      this.getAllUser();
      
      this.dtOptions ={
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        order: [0, 'asc']
      }
    }
  
   
  
    getAllUser(){
      this.userService.clearCache();
      this.userService.getAllUsers(this.loginUser.token).subscribe(users=>{
        this.users = users;
         this.chadr.detectChanges();
         this.dtTrigger.next();
         }, err=>{
           console.log(err);
         })
    }
  
    users$: Observable<any>;
    deleteUser(user_id:any){
      if(confirm("Are you sure want to delete this user ?")){
    this.userService.deleteUser(user_id, this.loginUser.token).subscribe(resp=>{
      this.userService.clearCache();
       this.users$ =this.userService.getAllUsers(this.loginUser.token);
       this.users$.subscribe(newList=>{
         this.users=newList;
         this.rerender();
         this.route.navigate(['/list_user'])
       }) 
       
    })
    }
  }
  




  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
