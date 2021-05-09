import { compilePipeFromMetadata } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Businessacfinance } from './../model/businessacfinance';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessacfinanceService {

  
  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/BusinessacFinance';
  public RETRIEVE_URL = this.COMMON_URL + '/getAllBusinessacfinances';
  public POST_FINANCE_URL = this.COMMON_URL + '/addbusinessacfinance/';
  public DELETE_URL = this.COMMON_URL + '/deleteStefinance/';
  public UPDATE_BA_FINANCE_RUL=this.COMMON_URL+'/bafinance/';
  public FINANCIAL_OF_BUSINESSAC = this.COMMON_URL + '/getAllFinanceOfBusinessac/';
  public DELETE_BA_FINANCE=this.COMMON_URL+'/';

  financeOfBusinessac: Observable<Businessacfinance[]>;
  constructor(private http: HttpClient) { }


  saveBusinessacFinance(businessacId: number, finance: any, token:any) {
    var url = this.POST_FINANCE_URL + businessacId + '/milestone';
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(url, finance, { headers: headers });
  }


  
  getAllBusinessacfinance():Observable<Businessacfinance[]>{
   return this.http.get<Businessacfinance[]>(this.RETRIEVE_URL);
  }



  getFinanceOfBusinessac(id: number): Observable<any> {
    return this.http.get<Businessacfinance[]>(this.FINANCIAL_OF_BUSINESSAC + id);
  }


  
  updateBAFinance(businessacId: number, bafinanceId: number, finance: any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_BA_FINANCE_RUL+businessacId +'/milestone/'+bafinanceId, finance, {headers: headers});
    }
    

  deleteBAfinance(businessacId: number, bafinanceId: number, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.UPDATE_BA_FINANCE_RUL + businessacId + '/financial/' + bafinanceId, {headers: headers});
  }



  clearcash() {
    this.financeOfBusinessac = null;
  }


}
