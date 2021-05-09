import { User } from '../../shared/model/user';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private subject =new Subject<any>();


  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      this.subject.next({status: true});
    }else{
      this.subject.next({status: false});
    }
  }

 

  storeRole(role: any) {
    this.removeRole();
    localStorage.setItem('role', JSON.stringify(role));
  }
  getRole() {
    // return localStorage.getItem("role");
    return JSON.parse(localStorage.getItem('role'));
  }

  removeRole() {
    return localStorage.removeItem("role");
  }

clearStatus(){
  this.subject.next()
}


getStatus():Observable<any>{
  return this.subject.asObservable();
}



}