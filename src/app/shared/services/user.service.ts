import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL=environment.apiBaseUrl;

 

  constructor(private http: HttpClient){}

 
  users$: Observable<any>

  registerUser(user: any):Observable<any>{
   const header = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json'});
   return this.http.post(this.URL +"/registration", user, {headers: header});
  }


  loginUser(user: any):Observable<any>{
    const header = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json'});
    return this.http.post(this.URL +"/login", user, {headers: header});
   }

   

   getAllUsers(token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    if(!this.users$){
      this.users$ =this.http.get<any>(this.URL +"/users", {headers: headers});
   }
   return this.users$;
  }


   getUser(token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(this.URL +"/getuser", {headers: headers});
   }


   updateUser(user: any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.URL +"/user/", user, {headers: headers});
   }


   deleteUser(id:any, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.URL+'/deleteUser/'+id, {headers: headers});
   }


   clearCache() 
   {
       this.users$ = null;
   }
   

}
