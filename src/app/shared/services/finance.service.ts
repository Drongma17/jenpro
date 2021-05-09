import { Finance } from './../model/entrepreneurs';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/finance';
  public ALL_FINANCE_URL = this.COMMON_URL + '/getAllFinance';
  public POST_URL = this.COMMON_URL + '/addFinance/';
  public RETRIVE_URL = this.COMMON_URL + '/entrepreneur/';
  public FINANCIAL_OF_ENTREPRENEUR = this.COMMON_URL + '/getAllFinanceOfEntrepreneur/';
  public PUT_URL = this.COMMON_URL + '/entrepreneur/';
  public DELETE_URL = this.COMMON_URL + '/preincubation/';
  financeOfEntrepreneurs$: Observable<Finance[]>;
  constructor(private http: HttpClient, private financeService: FinanceService) { }



  saveFinance(entrepreneurId: number, finance: any, token:any): Observable<any> {
    var url = this.POST_URL + entrepreneurId + '/milestone';
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(url, finance, { headers: headers });
  }


  getFinanceOfEntrepreneur(id: number): Observable<any> {
    return this.http.get<Finance[]>(this.FINANCIAL_OF_ENTREPRENEUR + id);
  }


  getAllFinances(): Observable<Finance[]> {
    return this.http.get<Finance[]>(this.ALL_FINANCE_URL);
  }


  updateFinance(entrepreneurId: number, financialId: number, finance: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.PUT_URL + entrepreneurId + '/financial/' + financialId, finance, { headers: headers });
  }



  deletefinanceofpreincubation(entrepreneurId: number, financialId: number): Observable<any> {
    return this.http.delete(this.DELETE_URL + entrepreneurId + '/milestone/' + financialId);
  }



  clearCache() {
    this.financeOfEntrepreneurs$ = null;
  }

}
