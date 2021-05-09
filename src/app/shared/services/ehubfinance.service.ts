import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ehubfinance } from './../model/ehub';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EhubfinanceService {

  public BASE_URL=environment.apiBaseUrl;
  public COMMON_URL=this.BASE_URL+'/ehubFinance';
  public ALL_FINANCE_URL=this.COMMON_URL+'/getAllEhubFinances';
  public POST_URL=this.COMMON_URL+'/addEhubFinance/';
  public RETRIVE_URL=this.COMMON_URL+'/entrepreneur/';
  public FINANCIAL_OF_EHUB=this.COMMON_URL+'/getAllEhubFinanceOfEhub/';
  public PUT_URL=this.COMMON_URL+'/ehub/';
  public DELETE_URL=this.COMMON_URL+'/deleteehub/'


  
   ehubfinanceOfEhubs$: Observable<Ehubfinance[]>;
    constructor(private http: HttpClient) { }
  
  
  
  saveEhubFinance(ehubId: number, efinance: any, token: any): Observable<any>{
    var url = this.POST_URL+ehubId+'/milestone';
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.post(url, efinance, {headers: headers})
  }
  
  
  getAllFinanceOfEhub(id: number): Observable<any>{
  return this.http.get<Ehubfinance[]>(this.FINANCIAL_OF_EHUB+id);
  }
  
  
  getAllEhubFinances():Observable<Ehubfinance[]>{
    return this.http.get<Ehubfinance[]>(this.ALL_FINANCE_URL);
  }
  
  
  updateEhubFinance(ehubId: number, efinancialId: number, finance: any, token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  return this.http.put(this.PUT_URL+ehubId +'/financial/'+efinancialId, finance, {headers: headers});
  }
  

  
  deleteEhubFinance(ehubId: number, efinancialId: number, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL+ehubId +'/milestone/'+efinancialId, {headers: headers});
    }
    

  clearcash(){
    this.ehubfinanceOfEhubs$ =null;
  }
  }
  