import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bacategory } from './../model/bacategory';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BacategoryService {

  private BASE_URL=environment.apiBaseUrl

  public COMMON_URL=this.BASE_URL+'/bacategory'
  public SAVE_URL=this.COMMON_URL+'/savebacategory'
  public RETRIEV_URL=this.COMMON_URL+'/getALLbacategories'
  public DELETE_URL=this.COMMON_URL+ '/deleteBacategory/'
  
    bacategories$: Observable<Bacategory[]>;
    constructor(private http: HttpClient) { }
  
  
    addBacategory(formData: FormData, token:any): Observable<any>{
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
     return this.http.post(this.SAVE_URL, formData, {headers: headers});
    }
  
    clearCache(){
      this.bacategories$=null;
    }
  
  
    getAllBacategories():Observable<Bacategory[]>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      if(!this.bacategories$){
        this.bacategories$ = this.http.get<Bacategory[]>(this.RETRIEV_URL, { headers: headers }).pipe(shareReplay());
      }
      return this.bacategories$;
    }
  
  
    deleteBacategory(id:any, token:any):Observable<any>{
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
      return this.http.delete(this.DELETE_URL+id, {headers: headers})
    }
  
  }
  