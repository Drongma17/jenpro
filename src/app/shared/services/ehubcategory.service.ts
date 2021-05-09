import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ehubcategory } from './../model/ehubcategory';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EhubcategoryService {

 
private BASE_URL=environment.apiBaseUrl

public COMMON_URL=this.BASE_URL+'/ehubcategory'
public SAVE_URL=this.COMMON_URL+'/addEhubCategory'
public RETRIEV_URL=this.COMMON_URL+'/getAllEhubCategories'
public DELETE_URL=this.COMMON_URL+ '/deleteEhubCategory/'

  ehubcategories$: Observable<Ehubcategory[]>;
  constructor(private http: HttpClient) { }


  addEhubcategory(formData: FormData): Observable<any>{
   return this.http.post(this.SAVE_URL, formData);
  }

 

  getAllEhubehubcategories():Observable<Ehubcategory[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if(!this.ehubcategories$){
      this.ehubcategories$ = this.http.get<Ehubcategory[]>(this.RETRIEV_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.ehubcategories$;
  }


  deleteEhubcategory(id:any):Observable<any>{
    return this.http.delete(this.DELETE_URL+id)
  }



  clearCache(){
    this.ehubcategories$=null;
  }
}
