import { Incuallocate } from './../model/incuallocate';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncubationallotService {

  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/incubationAllot';
  public GET_ALL_ALLOT = this.COMMON_URL + '/getAllIncubationAllocated';
  public POST_ALLOT = this.COMMON_URL + '/incubation/';
  public GET_ALL_BY_INCUBATIONID = this.COMMON_URL + '/allAllocatedByEntrepreneurId/'
  public DELETE_ALLOCATE = this.COMMON_URL + '/delete/';
  public UPDATE_ALLOCATE = this.COMMON_URL + '/update/';


  constructor(private http: HttpClient) { }


  getAllIncubationAllocation(): Observable<Incuallocate[]> {
    return this.http.get<Incuallocate[]>(this.GET_ALL_ALLOT);
  }


  saveallocattoincubation(entrepreneurId: number, allocated: any, token:any) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_ALLOT + entrepreneurId +'/allocated', allocated, {headers: headers});
  }


  getAllocationByIncubationId(incubationId: number): Observable<Incuallocate[]> {
    return this.http.get<Incuallocate[]>(this.GET_ALL_BY_INCUBATIONID + incubationId)
  }



  deletallocation(incubationId: number, allocatedId: number, token:any):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   return this.http.delete(this.DELETE_ALLOCATE + incubationId + '/allocated/' + allocatedId, {headers: headers})
  }



  updateallocateofincubation(incubationId: number, allocatedId: number, allocate: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put(this.UPDATE_ALLOCATE + incubationId + '/allocated/' + allocatedId, allocate, {headers: headers});
  }

}
