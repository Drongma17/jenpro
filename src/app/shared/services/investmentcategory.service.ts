import { Investmentcategory } from './../model/investmentcategory';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentcategoryService {

  public BaseURL = environment.apiBaseUrl;
  public COMMON_URL = this.BaseURL + '/investment_category';
  public POST_URL = this.COMMON_URL + '/saveInvestmentCategory';
  public RETRIEVE_URL = this.COMMON_URL + '/getAllInvestmentCategories';
  public GET_ONE = this.COMMON_URL + '/getOneInvestmentCategory/';
  public DELET_URL = this.COMMON_URL + '/deleteInvestmentCategory/';

  constructor(private http: HttpClient) { }

  investmentCategory$: Observable<Investmentcategory[]>;

  addInvestmentCategory(formData: FormData, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL, formData, {headers: headers});
  }


  getInvestmentCategories(): Observable<Investmentcategory[]> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.investmentCategory$) {
      this.investmentCategory$ = this.http.get<Investmentcategory[]>(this.RETRIEVE_URL);
    }
    return this.investmentCategory$;
  }


  deleteInvestmentCategory(id: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELET_URL + id, {headers: headers});
  }


  clearCache() {
    this.investmentCategory$ = null;
  }

  
}
