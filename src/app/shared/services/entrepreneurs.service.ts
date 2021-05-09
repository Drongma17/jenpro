import { environment } from '../../../environments/environment';
import { Entrepreneurs } from '../model/entrepreneurs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EntrepreneursService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/entrepreneurship';

  public PUBLIC_URL = this.BASE_URL + '/common';
  public POST_URL = this.COMMON_URL + '/saveEntrepreneurProfile';
  public RETRIVAL_URL = this.COMMON_URL + '/entrepreneurs';
  public RETRIVE_ONE_ENTREPRENEUR =this.COMMON_URL+'/getEntrepreneur/'
  public CATEGORY_URL = this.COMMON_URL + '/getByCategory/'
  public IMAGE_URL = this.COMMON_URL + '/files/';
  public DELETE_URL = this.COMMON_URL + '/delete/';


  private entrepreneur$: Observable<Entrepreneurs[]>;
  list: Entrepreneurs[];
  constructor(private http: HttpClient) { }


  saveEntrepreneurProfile(formdata: FormData, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL, formdata, {headers: headers});
  }


  getAllEntrepreneurs(): Observable<Entrepreneurs[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.entrepreneur$) {
      this.entrepreneur$ = this.http.get<Entrepreneurs[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.entrepreneur$;
  }


  getEntrepreneursByCategory(categoryName: string): Observable<Entrepreneurs[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Entrepreneurs[]>(this.CATEGORY_URL +categoryName, { headers: headers }).pipe(shareReplay());
  }



  deleteentrepreneur(id: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers})
  }


  getEntrepreneur(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_ENTREPRENEUR+id);
  }

  refreshList() {
    this.http.get(this.RETRIVAL_URL)
      .toPromise().then(res => this.list = res as Entrepreneurs[]);
  }


  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.entrepreneur$ = null;
  }

}
