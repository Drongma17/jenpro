import { Investmentallocate } from './../model/investmentallocate';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestmentallocateService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/investmentallocate';
  public GET_ALL_INVESTMENT_ALLOCATE = this.COMMON_URL + '/getAllInvestmentAllocates';
  public POST_URL = this.COMMON_URL + '/addInvestmentAllocate/';
  public GET_ALL_BY_INVESTMENT_ID = this.COMMON_URL + '/getAllByInvestmentId/';
  public DELETE_URL = this.COMMON_URL + '/delete/';
  public UPDATE_URL = this.COMMON_URL + '/updateInvestAllocate/';

  constructor(private http: HttpClient) {

  }


  getAllInvestmentAllocate(): Observable<Investmentallocate[]> {
    return this.http.get<Investmentallocate[]>(this.GET_ALL_INVESTMENT_ALLOCATE);
  }


  saveInvestmentAllocate(investmentId: number, allocate: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL + investmentId, allocate, {headers: headers});
  }


  getAllAllocatedByInvestmentId(investmentId: number): Observable<Investmentallocate[]> {
    return this.http.get<Investmentallocate[]>(this.GET_ALL_BY_INVESTMENT_ID + investmentId);
  }


  deleteInvestmentallocate(investmentId: number, investmentallocateId: number, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + investmentId + '/allocate/' + investmentallocateId, {headers: headers});
  }



  updateInvestmentAllocate(investmentId: number, investmentallocateId: number, allocate: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_URL + investmentId + '/allocate/' + investmentallocateId, allocate, {headers: headers});
  }


}
