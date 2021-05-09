import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../model/guest';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public BASE_URL = environment.apiBaseUrl;

  public COMMON_URL = this.BASE_URL + "/guestProfile";
  public POST_URL = this.COMMON_URL + "/saveGuest";
  public RETRIVE_URL = this.COMMON_URL + "/getAllGuests";
  public DELETE_URL = this.COMMON_URL + "/deleteParticularGuest/";
  public IMAGE_URL = this.COMMON_URL + '/files/';
  public PUBLIC_URL = this.BASE_URL + '/common/allguests';



  private guests$: Observable<Guest[]>;

  constructor(private http: HttpClient) { }


  saveGuest(formdata: FormData, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL, formdata, {headers: headers});
  }


  getAllGuests(): Observable<Guest[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.guests$) {
      this.guests$ = this.http.get<Guest[]>(this.RETRIVE_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.guests$;
  }


  deleteGuest(id: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers})
  }


  clearCache() {
    this.guests$ = null;
  }


}
