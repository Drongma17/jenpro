import { shareReplay } from 'rxjs/operators';
import { Businessac } from './../model/businessac';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessacService {

  
  public  BASE_URL = environment.apiBaseUrl;
  public  COMMON_URL = this.BASE_URL + '/businessac';

  
  public  POST_URL = this.COMMON_URL + '/saveBusinessac';
  public  RETRIVAL_URL = this.COMMON_URL + '/getAllBusinessac';
  public  RETRIVE_ONE_BUSINESSAC=this.COMMON_URL+'/getBusinessacById/';
  public  IMAGE_URL = this.COMMON_URL + '/files/';
  public  DELETE_URL = this.COMMON_URL + '/deleteBusiness/';

  public BA_CATEGORY_URL =this.COMMON_URL+'/getBusinessacByCategory/'
  constructor(private http: HttpClient) { }

  list: Businessac[];
  businessac$: Observable<Businessac[]>;
  saveBusinessacProfile(formdata: FormData, token:any): Observable<Businessac> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Businessac>(this.POST_URL, formdata, {headers: headers});
  }


  getBusinessac(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_BUSINESSAC+id);
  }



  getAllBusinessac(): Observable<Businessac[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.get<Businessac[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
  
  }

  
  deleteBusinessac(id: number, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers});
  }

  refreshList() {
    this.http.get(this.RETRIVAL_URL)
      .toPromise().then(res => this.list = res as Businessac[]);
  }


  getBusinessacByCategory(baCategoryName: string): Observable<Businessac[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Businessac[]>(this.BA_CATEGORY_URL +baCategoryName, { headers: headers }).pipe(shareReplay());
  }


  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.businessac$ = null;
  }


  
}
