import { Lendmoney } from './../model/lendmoney';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LendmoneyService {


  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/lendmoney';
  public GET_ALL_LEND_MONEY = this.COMMON_URL + '/getAllLendMoney';
  public POST_LENDMONEY = this.COMMON_URL + '/addlendMoney/';
  public GET_ALL_BY_SNOWBANKID = this.COMMON_URL + '/getMoneyBySnowbankId/'
  public DELETE_LENDMONEY = this.COMMON_URL + '/deleteLendMoney/';
  public UPDATE_LENDMONEY = this.COMMON_URL + '/updateLendMoney/';


  constructor(private http: HttpClient) { }


  getAllLendmoney(): Observable<Lendmoney[]> {
    return this.http.get<Lendmoney[]>(this.GET_ALL_LEND_MONEY);
  }


  saveLendmoneyToSnowBank(snowbankId: number, lendmoney: any, token:any) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_LENDMONEY + snowbankId, lendmoney, {headers: headers});
  }


  getAllLendmoneyBySnowbankId(snowbankId: number): Observable<Lendmoney[]> {
    return this.http.get<Lendmoney[]>(this.GET_ALL_BY_SNOWBANKID + snowbankId)
  }



  deleteLendmoney(snowbankId: number, lendmoneyId: number, token:any):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.delete(this.DELETE_LENDMONEY + snowbankId + '/showbank/' + lendmoneyId, {headers: headers})
  }



  updateLendmoney(snowbankId: number, lendmoneyId: number, allocate: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_LENDMONEY + snowbankId + '/' + lendmoneyId, allocate, {headers: headers});
  }


}
