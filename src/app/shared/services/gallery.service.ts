import { Gallery } from './../model/gallery';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  

  public BASE_URL = environment.apiBaseUrl;

  public COMMON_URL = this.BASE_URL + "/galleryProfile";
  public POST_URL = this.COMMON_URL + "/saveImage";
  public RETRIVE_URL = this.COMMON_URL + "/getAllImages";
  public DELETE_URL = this.COMMON_URL + "/deleteImage/";
  public IMAGE_URL = this.COMMON_URL + '/files/';
  public PUBLIC_URL = this.BASE_URL + '/common/allGalleries'



  private galleries$: Observable<Gallery[]>;

  constructor(private http: HttpClient) { }


  saveGallery(formdata: FormData, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(this.POST_URL, formdata, {headers: headers});
  }


  getAllImage(): Observable<Gallery[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (!this.galleries$) {
      this.galleries$ = this.http.get<Gallery[]>(this.RETRIVE_URL, { headers: headers }).pipe(shareReplay());
    }
    return this.galleries$;
  }


  deleteImage(id: any, token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete(this.DELETE_URL + id, {headers: headers})
  }


  errorHandler(error: Response) {
    return throwError(error);
  }

  clearCache() {
    this.galleries$ = null;
  }

}
