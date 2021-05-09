import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stefinance } from './../model/stefinance';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StefinanceService {

  
  
  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/stefinance';
  public RETRIEVE_URL = this.COMMON_URL + '/getAllStefinance';
  public POST_FINANCE_URL = this.COMMON_URL + '/addfinancetoSte/';
  public DELETE_URL = this.COMMON_URL + '/deleteStefinance/';
  public FINANCIAL_OF_STE = this.COMMON_URL + '/getAllBySteId/';
  public PUT_URL=this.COMMON_URL+'/updatestefinance/';

  financeOfSte: Observable<Stefinance[]>;
  constructor(private http: HttpClient) { }



  getAllSTEfinances(): Observable<Stefinance[]>{
    return this.http.get<Stefinance[]>(this.RETRIEVE_URL)
  }

  saveSteFinance(steId: number, finance: any, token:any) {
    var url = this.POST_FINANCE_URL + steId + '/milestone';
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(url, finance, { headers: headers });
  }



  getFinanceOfSte(id: number): Observable<any> {
    return this.http.get<Stefinance[]>(this.FINANCIAL_OF_STE + id);
  }


  updatestefinance(steId: number, stefinanceId: number, finance: any, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.PUT_URL+steId+'/milestone/'+stefinanceId, finance, {headers: headers});
  }



  deletestefinance(steId: number, stefinanceId: number, token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+steId+'/milestone/'+stefinanceId, {headers: headers});
  }


  clearcash() {
    this.financeOfSte = null;
  }


}
