import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IdResponse } from '../models/common/id-response';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private route = inject(Router);
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  CreateAccount(path: string, body: any): Observable<IdResponse> {
    return this.http.post<IdResponse>(`${this.baseUrl}/${path}`, body).pipe(
      tap(resp => {
        if (resp.success) {
          this.route.navigate(['/login']);
        }
      })
    );
  }
  UpdateProfile(path: string,id:any, body: any):Observable<IdResponse>{
      return this.http.put<IdResponse>(`${this.baseUrl}/accounts/${id}/${path}`,body);
  }

}
