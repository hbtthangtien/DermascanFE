import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IdResponse } from '../models/common/id-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService{
  private route = inject(Router)
  constructor(http: HttpClient) {
    super(http);
  }
   CreateAccount(path: string, body: any): Observable<IdResponse> {
      return super.post<IdResponse>(path,body).pipe(
        tap(resp => {
          if (resp.success) {
              this.route.navigate(['/login']);
          }
        })
      );
  }
}
