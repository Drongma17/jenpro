import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subcategory } from './../model/subcategory';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

 
private BASE_URL=environment.apiBaseUrl

public COMMON_URL=this.BASE_URL+'/subCategory'
public SAVE_URL=this.COMMON_URL+'/saveSubCategory'
public GET_BY_CHILD_CATEGORY= this.COMMON_URL+ '/getByChildCategory/'
public RETRIEV_BYNAME=this.COMMON_URL+'/getByName/'
public DELETE_URL=this.COMMON_URL+ '/deleteCategory/'

  subcategories$: Observable<Subcategory[]>;
  subcategory: Observable<Subcategory>;
  constructor(private http: HttpClient) { }


  addSubCategory(formData: FormData, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.post(this.SAVE_URL, formData, {headers: headers});
  }

  clearCache(){
    this.subcategories$=null;
  }


  getBySubCategoryId(childCategoryId: any):Observable<Subcategory>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if(!this.subcategory){
      this.subcategory = this.http.get<Subcategory>(this.GET_BY_CHILD_CATEGORY + childCategoryId, { headers: headers }).pipe(shareReplay());
    }
    return this.subcategory;
  }


  getChildCategoryById(childCategoryId: any):Observable<Subcategory[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get<Subcategory[]>(this.GET_BY_CHILD_CATEGORY + childCategoryId, { headers: headers }).pipe(shareReplay());
  }



  getAllSubCategoryName(name: any):Observable<Subcategory[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if(!this.subcategories$){
      this.subcategories$ = this.http.get<Subcategory[]>(this.RETRIEV_BYNAME +name, { headers: headers }).pipe(shareReplay());
    }
    return this.subcategories$;
  }


  deleteSubCategory(id:any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+id, {headers: headers})
  }

}
