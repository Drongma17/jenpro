import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ste } from './../model/ste';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SteService {
  public  BASE_URL = environment.apiBaseUrl;
  public  COMMON_URL = this.BASE_URL + '/steprofile';

  public  POST_URL = this.COMMON_URL + '/saveSte';
  public  RETRIVAL_URL = this.COMMON_URL + '/getAllStes';
  public  RETRIVE_ONE_INVESTMENT =this.COMMON_URL+'/getSte/'
  public  IMAGE_URL = this.COMMON_URL + '/files/';
  public  DELETE_URL = this.COMMON_URL + '/deleteSte/';
  public GET_BY_CATEGORY_NAME= this.COMMON_URL+'/getSteByCategoryName/'

  private stes$: Observable<Ste[]>;
  constructor(private http: HttpClient) { }


  saveSkillToEnterprice(formdata: FormData, token:any): Observable<Ste> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Ste>(this.POST_URL, formdata, {headers: headers})
  }


  getAllStes(): Observable<Ste[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.stes$) {
      this.stes$ = this.http.get<Ste[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.stes$;
  }


  getSteByCategoryName(stebycategoryName: string): Observable<Ste[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Ste[]>(this.GET_BY_CATEGORY_NAME +stebycategoryName, { headers: headers }).pipe(shareReplay());
  }

  deleteSte(id: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers})
  }


  getSte(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_INVESTMENT+id);
  }


  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.stes$ = null;
  }

}
