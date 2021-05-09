import { shareReplay } from 'rxjs/operators';
import { Announce } from './../model/announce';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {


  public BASE_URL=environment.apiBaseUrl;
  public COMMON_URL=this.BASE_URL+'/announcement';
  
  public POST_URL=this.COMMON_URL+ '/saveAnnouncement';
  public RETRIVAL_URL=this.COMMON_URL+'/getAllAnnouncement';
  public IMAGE_URL =this.COMMON_URL+'/files/';
  public DELETE_URL=this.COMMON_URL+'/deleteAnnounce/';
  
  
  private announcements$: Observable<Announce[]>;
   
  constructor(private http: HttpClient) { }
  
  
    saveAnnouncement(formdata: FormData): Observable<any>{
      return this.http.post(this.POST_URL, formdata);
    }
  
  
    getAllAnnounces():Observable<Announce[]>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      if(!this.announcements$){
        this.announcements$ = this.http.get<Announce[]>(this.RETRIVAL_URL, { headers: headers }).pipe(shareReplay());
      }
      return this.announcements$;
    }
  
  
  
  
    deleteannouncement(id:any):Observable<any>{
      return this.http.delete(this.DELETE_URL+id)
    }
  
   
   errorHandler(error: Response){
     return throwError(error); 
   }
  
   clearCache() 
   {
       this.announcements$ = null;
   }
  }  
