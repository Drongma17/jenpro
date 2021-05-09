import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Returnmoney } from './../model/returnmoney';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReturnmoneyService {

 
  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/returnmoney';
  public ALL_RETURNMONEY_URL = this.COMMON_URL + '/getAllReturnMoney';
  public POST_URL = this.COMMON_URL + '/addReturnMoney/';
  public RETURNMONEY_OF_SNOWBANK = this.COMMON_URL + '/getReturnMoneyBySnowbankId/';
  public PUT_URL = this.COMMON_URL + '/updateReturnMoney/';
  public DELETE_URL = this.COMMON_URL + '/deleteReturnMoney/';


  returnMoneyOfSnowbank$: Observable<Returnmoney[]>;
  constructor(private http: HttpClient, private returnMoneyService: ReturnmoneyService) { }



  saveReturnMoney(snowbankId: number, finance: any, token:any): Observable<any> {
    var url = this.POST_URL + snowbankId ;
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(url, finance, { headers: headers });
  }


  getReutnMoneyOfSnowbank(id: number): Observable<any> {
    return this.http.get<Returnmoney[]>(this.RETURNMONEY_OF_SNOWBANK + id);
  }


  getAllReturnMoney(): Observable<Returnmoney[]> {
    return this.http.get<Returnmoney[]>(this.ALL_RETURNMONEY_URL);
  }


  updateReturnMoney(snowbankId: number, returnmoneyId: number, returnmoney: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.PUT_URL + snowbankId + '/' + returnmoneyId, returnmoney, { headers: headers });
  }



  deleteReturnmoneyOfSnowbank(snowbankId: number, returnMoneyId: number): Observable<any> {
    return this.http.delete(this.DELETE_URL + snowbankId + '/' + returnMoneyId);
  }



  clearCache() {
    this.returnMoneyOfSnowbank$ = null;
  }

}
