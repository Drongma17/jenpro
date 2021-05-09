import { Events } from './../model/events';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events$: Observable<Events[]>;
  public BASE_URL = environment.apiBaseUrl;
  public COMMON_URL = this.BASE_URL + '/api/events/';

  public POST_URL = this.COMMON_URL + 'saveEvent';
  public RETRIVAL_URL = this.COMMON_URL + 'allEvents';
  public IMAGE_URL = this.COMMON_URL + 'files/';
  public DELETE_URL = this.COMMON_URL + 'deleteEvent/';

  constructor(private http: HttpClient) { }


  saveEvent(formdata: FormData, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL, formdata, {headers: headers})
  }


  getAllEvents(): Observable<Events[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if (!this.events$) {
      this.events$ = this.http.get<Events[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.events$;
  }


  deleteEvent(id: number, token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers});
  }

  errorhandler(error: Response) {
    return throwError(error);
  }


  clearCache() {
    this.events$ = null;
  }

}
