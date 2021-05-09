import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stecategory } from './../model/stecategory';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StecategoryService {

 
private BASE_URL=environment.apiBaseUrl

public COMMON_URL=this.BASE_URL+'/stecategory'
public SAVE_URL=this.COMMON_URL+'/addStecategory'
public RETRIEV_URL=this.COMMON_URL+'/getAllSteCategories'
public DELETE_URL=this.COMMON_URL+ '/deletestecategory/'

  stecategories$: Observable<Stecategory[]>;
  constructor(private http: HttpClient) { }


  addSteCategory(formData: FormData, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.post(this.SAVE_URL, formData, {headers: headers});
  }

  clearCache(){
    this.stecategories$=null;
  }


  getAllSteCategories():Observable<Stecategory[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return   this.http.get<Stecategory[]>(this.RETRIEV_URL, { headers: headers }).pipe(shareReplay());
  }


  deleteSteCategory(id:any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+id, {headers: headers})
  }

}
