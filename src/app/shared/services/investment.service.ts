import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Investment } from './../model/investment';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  public  BASE_URL = environment.apiBaseUrl;
  public  COMMON_URL = this.BASE_URL + '/investment';

  public  POST_URL = this.COMMON_URL + '/saveInvestment';
  public  RETRIVAL_URL = this.COMMON_URL + '/getAllInvestment';
  public  RETRIVE_ONE_INVESTMENT =this.COMMON_URL+'/getInvestment/'
  public  IMAGE_URL = this.COMMON_URL + '/files/';
  public  DELETE_URL = this.COMMON_URL + '/deleteInvestement/';
  public GET_BY_CATEGORY_NAME=this.COMMON_URL+'/getInvestmentByCategory/'

  private investment$: Observable<Investment[]>;
  list: Investment[];
  constructor(private http: HttpClient) { }


  saveInvestmentProfile(formdata: FormData, token: any): Observable<Investment> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Investment>(this.POST_URL, formdata, {headers: headers});
  }


  getAllInvestments(): Observable<Investment[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.investment$) {
      this.investment$ = this.http.get<Investment[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.investment$;
  }


  deleteinvestment(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers})
  }


  getInvestment(id:any):Observable<any>{
    return this.http.get(this.RETRIVE_ONE_INVESTMENT+id);
  }


  getInvestmentByCategoryName(investmentCategoryName: string): Observable<Investment[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.get<Investment[]>(this.GET_BY_CATEGORY_NAME +investmentCategoryName, { headers: headers }).pipe(shareReplay());
  }

  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.investment$ = null;
  }

}
