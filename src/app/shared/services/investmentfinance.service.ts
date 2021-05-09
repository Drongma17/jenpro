import { Investmentfinance } from './../model/investmentfinance';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentfinanceService {


  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/investmentfinance';
  public RETRIEVE_URL = this.COMMON_URL + '/getAllInvestmentFinance';
  public POST_FINANCE_URL = this.COMMON_URL + '/addInvestmentFinance/';
  public DELETE_URL = this.COMMON_URL + '/deleteInvestmentFinance/';
  public FINANCIAL_OF_INVESTMENT = this.COMMON_URL + '/getTotalFinanceByInvestmentId/';
  public PUT_URL =this.COMMON_URL+'/investment/';
 

  financeOfInvestment: Observable<Investmentfinance[]>;
  constructor(private http: HttpClient) { }


  saveInvestmentFinance(investmentId: number, finance: any, token:any) {
    var url = this.POST_FINANCE_URL + investmentId + '/milestone';
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(url, finance, { headers: headers });
  }


  getAllInvestmentFinances(): Observable<Investmentfinance[]>{
   return this.http.get<Investmentfinance[]>(this.RETRIEVE_URL);
  }

  getFinanceOfInvestment(id: number): Observable<any> {
    return this.http.get<Investmentfinance[]>(this.FINANCIAL_OF_INVESTMENT + id);
  }


  updateinvstmentfinance(investmentId: number, ifinanceId: number, finance:any, token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  return this.http.put(this.PUT_URL+investmentId+'/milestone/'+ifinanceId, finance, {headers: headers});
  }


  deleteinvstmentfinance(investmentId: number, ifinanceId: number, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+investmentId+'/milestone/'+ifinanceId, {headers: headers});
    }
  

  clearcash() {
    this.financeOfInvestment = null;
  }


}
