import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanAnalysisService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }
  ValidatePlanUser(): Observable<any>{
      return super.post<any>('skin-analysis/validate',{});
  }
  scanImage(formData: FormData): Observable<any>{
    return super.post<any>('skin-analysis',formData);
  }
}
