import { Observable } from 'rxjs';
import { Baallocate } from './../model/baallocate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaallocateService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/baallocate';
  public GET_ALL_ALLOT = this.COMMON_URL + '/getAllBAAlocates';
  public POST_ALLOT = this.COMMON_URL + '/addBAAllocateToBusinessac/';
  public GET_ALL_BY_BAID = this.COMMON_URL + '/getALLBAAllocateByBusinessacId/'
  public DELETE_ALLOCATE = this.COMMON_URL + '/deleteBAAllocate/';
  public UPDATE_ALLOCATE = this.COMMON_URL + '/updateBAAllocateOfBusinessac/';


  constructor(private http: HttpClient) { }


  getAllBusinessacAllocation(): Observable<Baallocate[]> {
    return this.http.get<Baallocate[]>(this.GET_ALL_ALLOT);
  }


  saveallocateToBusinessac(businessacId: number, allocated: any, token:any) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_ALLOT + businessacId +'/allocated', allocated, {headers: headers});
  }


  getAllocationByBAId(businessacId: number): Observable<Baallocate[]> {
    return this.http.get<Baallocate[]>(this.GET_ALL_BY_BAID + businessacId)
  }



  deleteBAallocation(businessacId: number, allocatedId: number, token:any):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.delete(this.DELETE_ALLOCATE + businessacId + '/' + allocatedId, {headers: headers})
  }



  updateallocateofbusinessac(incubationId: number, allocatedId: number, allocate: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_ALLOCATE + incubationId + '/allocated/' + allocatedId, allocate, {headers: headers});
  }


}
