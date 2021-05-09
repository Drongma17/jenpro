import { Ehuballocate } from './../model/ehuballocate';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EhuballocateService {


  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/ehuballocates';
  public GET_ALL_ALLOCATE = this.COMMON_URL + '/getAllEhubAllocates';
  public POST_URL = this.COMMON_URL + '/addEhubAllocate/';
  public GET_ALL_BY_EHUBID=this.COMMON_URL +'/getEhubAllocatedByEhubId/';
  public DELETE_URL=this.COMMON_URL +'/deleteEhubAllocate/';
  public PUT_URL =this.COMMON_URL + '/update/';


  constructor(private http: HttpClient) { }



  getAllEhubAllocatedfind(): Observable<Ehuballocate[]> {
    return this.http.get<Ehuballocate[]>(this.GET_ALL_ALLOCATE)
  }



  saveEhubAllocate(ehubId: number, allocate: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL + ehubId +'/allocated', allocate, {headers: headers});
  }

  

  getAllocationByEhubId(ehubId: number): Observable<any> {
   return this.http.get<any>(this.GET_ALL_BY_EHUBID +ehubId)
  }



  deleteEhubAllocate(ehubId: number, ehuballocateId: number, token: any):Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL +ehubId +'/allocate/'+ehuballocateId, {headers: headers});
  }



  updateEhubAllocate(ehubId: number, ehuballocateId: number, allocate: any, token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.PUT_URL +ehubId +'/allocate/'+ehuballocateId, allocate, {headers: headers});
  }


}
