import { Observable } from 'rxjs';
import { Steallocate } from './../model/steallocate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SteallocateService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/steallocate';
  public GET_ALL_STE_ALLOCATE = this.COMMON_URL + '/getAllSteAllocates';
  public POST_URL = this.COMMON_URL + '/addSteAllocate/';
  public GET_ALL_BY_STE_ID = this.COMMON_URL + '/getSteAllocateBySteId/';
  public DELETE_URL = this.COMMON_URL + '/deleteSteallocate/';
  public UPDATE_URL = this.COMMON_URL + '/updateSteAllocate/';

  constructor(private http: HttpClient) {

  }


  getAllSteAllocate(): Observable<Steallocate[]> {
    return this.http.get<Steallocate[]>(this.GET_ALL_STE_ALLOCATE);
  }


  saveSteAllocate(investmentId: number, allocate: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL + investmentId, allocate, {headers: headers});
  }


  getAllAllocatedBySteId(investmentId: number): Observable<Steallocate[]> {
    return this.http.get<Steallocate[]>(this.GET_ALL_BY_STE_ID + investmentId);
  }


  deleteSteallocate(investmentId: number, investmentallocateId: number, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + investmentId  +'/'+ investmentallocateId, {headers: headers});
  }



  updateSteAllocate(investmentId: number, investmentallocateId: number, allocate: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_URL + investmentId + '/allocate/' + investmentallocateId, allocate, {headers: headers});
  }



}