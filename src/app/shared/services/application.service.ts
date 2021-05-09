import { shareReplay } from 'rxjs/operators';
import { Application } from './../model/application';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }


  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/applications';
  public GET_ALL_URL = this.COMMON_URL + '/getAllApplication';
  public POST_URL = this.COMMON_URL + '/saveApplication';
  public DELETE_URL = this.COMMON_URL + '/deleteApplication/';
  public IMAGE_URL = this.COMMON_URL + '/files/';
  public GET_BY_CATEGORY = this.COMMON_URL + '/getApplicationByCategoryName/';


  applicatios$:Observable<Application[]>;

  
    getAllApplicantions(): Observable<Application[]> {
    if (!this.applicatios$) {
      this.applicatios$ = this.http.get<Application[]>(this.GET_ALL_URL).pipe(shareReplay());
    }
    return this.applicatios$;
  }

  saveApplication(formData: any) : Observable<Application>{
  return this.http.post<Application>(this.POST_URL, formData);
  }

 

  deleteApplicant(applicantId: number, token:any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.delete(this.DELETE_URL + applicantId, {headers: headers});
  }



  getAllApplicantByCategory(category: any): Observable<Application[]> {
    return this.http.get<Application[]>(this.GET_BY_CATEGORY + category)
  }



  clearCache() {
    this.applicatios$ = null;
  }

}
