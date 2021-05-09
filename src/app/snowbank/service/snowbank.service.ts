import { shareReplay } from 'rxjs/operators';
import { Snowbank } from './../model/snowbank';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnowbankService {

  
  public  BASE_URL = environment.apiBaseUrl;
  public  COMMON_URL = this.BASE_URL + '/snowbank';

  
  public  POST_URL = this.COMMON_URL + '/saveSnowBank';
  public  RETRIVAL_URL = this.COMMON_URL + '/getAllSnowBank';
  public  RETRIVE_ONE_SNOWBANK =this.COMMON_URL+'/getSnowBank/'
  public  IMAGE_URL = this.COMMON_URL + '/files/';
  public  DELETE_URL = this.COMMON_URL + '/deleteSnowBank/';
  public GET_SNOWBANK_BY_CATEGORY_NAME=this.COMMON_URL+"/getSnowBankByCategory/"

  constructor(private http: HttpClient) {
   }


   snowbanks$: Observable<Snowbank[]>;
  list: Snowbank[];


  saveSnowBank(formdata: FormData, token:any): Observable<Snowbank> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Snowbank>(this.POST_URL, formdata, { headers: headers});
  }


  getAllSnowbanks(): Observable<Snowbank[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.snowbanks$) {
      this.snowbanks$ = this.http.get<Snowbank[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.snowbanks$;
  }


  
  deleteSnowbank(id: number, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers});
  }


  getSnowbank(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_SNOWBANK+id);
  }


  refreshList() {
    this.http.get(this.RETRIVAL_URL)
      .toPromise().then(res => this.list = res as Snowbank[]);
  }

 

  getSnowbankByCategoryName(categoryName: string): Observable<Snowbank[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Snowbank[]>(this.GET_SNOWBANK_BY_CATEGORY_NAME +categoryName, { headers: headers }).pipe(shareReplay());
  }

  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.snowbanks$ = null;
  }


}
