import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sbcategory } from './../model/sbcategory';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SbcategoryService {

 
private BASE_URL=environment.apiBaseUrl

public COMMON_URL=this.BASE_URL+'/snowbankCategory'
public SAVE_URL=this.COMMON_URL+'/saveSnowbankCategory'
public RETRIEV_URL=this.COMMON_URL+'/getAllSnowbankCategories'
public DELETE_URL=this.COMMON_URL+ '/deleteSnowbankCategory/'

  categories$: Observable<Sbcategory[]>;
  constructor(private http: HttpClient) { }


  addSbcategory(formData: FormData, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.post(this.SAVE_URL, formData, {headers: headers});
  }

  clearCache(){
    this.categories$=null;
  }


  getAllCategories():Observable<Sbcategory[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return  this.http.get<Sbcategory[]>(this.RETRIEV_URL, { headers: headers }).pipe(shareReplay());
   
  }


  deleteSbcategory(id:any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+id, {headers: headers})
  }

}
