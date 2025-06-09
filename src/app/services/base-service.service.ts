import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // get method
  get<T>(path: string, params?:{[key:string]:any}):Observable<T>{
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params[key] !== null && params[key] !== undefined)
          httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.get<T>(`${this.baseUrl}/${path}`, { params: httpParams });
  }

  // GET by ID
  getById<T>(path: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}/${id}`);
  }
   // POST
  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, body);
  }
  // PUT
  put<T>(path: string, id: number | string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}/${id}`, body);
  }
   // DELETE
  delete<T>(path: string, id: number | string, body?:any): Observable<T> {
    if(body)
      return this.http.delete<T>(`${this.baseUrl}/${path}/${id}`,{body});
    else 
      return this.http.delete<T>(`${this.baseUrl}/${path}/${id}`);
  }
}
