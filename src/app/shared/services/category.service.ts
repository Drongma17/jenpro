import { Category } from './../model/category';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private BASE_URL=environment.apiBaseUrl

public COMMON_URL=this.BASE_URL+'/category'
public SAVE_URL=this.COMMON_URL+'/addCategory'
public RETRIEV_URL=this.COMMON_URL+'/getAllCategories'
public DELETE_URL=this.COMMON_URL+ '/deleteCategory/'

  categories$: Observable<Category[]>;
  constructor(private http: HttpClient) { }


  addCategory(formData: FormData, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.post(this.SAVE_URL, formData, {headers: headers});
  }

  clearCache(){
    this.categories$=null;
  }


  getAllCategories():Observable<Category[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if(!this.categories$){
      this.categories$ = this.http.get<Category[]>(this.RETRIEV_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.categories$;
  }


  deleteCategory(id:any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+id, {headers: headers})
  }

}
