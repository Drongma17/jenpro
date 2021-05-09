import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Ehub } from '../model/ehub';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EhubService {

  
  public  BASE_URL = environment.apiBaseUrl;
  public  COMMON_URL = this.BASE_URL + '/ehubProfile';

  
  public  POST_URL = this.COMMON_URL + '/saveEhub';
  public  RETRIVAL_URL = this.COMMON_URL + '/getAllEhubs';
  public  RETRIVE_ONE_EHUB =this.COMMON_URL+'/getEhubById/'
  public  IMAGE_URL = this.COMMON_URL + '/files/';
  public  DELETE_URL = this.COMMON_URL + '/deleteEhub/';
  public GET_EHUB_BY_CATEGORY_NAME=this.COMMON_URL+"/getEhubByCategoryName/"

  constructor(private http: HttpClient) {
   }


  ehubs$: Observable<Ehub[]>;
  list: Ehub[];
  saveEhubProfile(formdata: FormData, token:any): Observable<Ehub> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Ehub>(this.POST_URL, formdata, { headers: headers});
  }


  getAllEhubs(): Observable<Ehub[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.ehubs$) {
      this.ehubs$ = this.http.get<Ehub[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.ehubs$;
  }


  
  deleteehub(id: number, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers});
  }


  getEhub(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_EHUB+id);
  }


  refreshList() {
    this.http.get(this.RETRIVAL_URL)
      .toPromise().then(res => this.list = res as Ehub[]);
  }

 

  getEhubByCategoryName(ehubCategoryName: string): Observable<Ehub[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Ehub[]>(this.GET_EHUB_BY_CATEGORY_NAME +ehubCategoryName, { headers: headers }).pipe(shareReplay());
  }

  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.ehubs$ = null;
  }


}
