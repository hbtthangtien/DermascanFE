import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../models/common/base-response';
import { SkinAnalysisHistory } from '../models/SkinAnalysis/History/skin-analysis-history';
import { ZoneScore } from '../models/SkinAnalysis/History/zone-score';

@Injectable({
  providedIn: 'root'
})
export class SkinAnalysisHistoryService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }
  getSkinHistory(id:number):Observable<BaseResponse<SkinAnalysisHistory[]>>{
    return super.get(`skin-analysis/users/${id}/history`);
  }
  getHistory(userId: number, from?: Date, to?: Date): Observable<SkinAnalysisHistory[]> {
    const params: { [key: string]: any } = {};
    if (from) params['from'] =  from.toISOString();
    if (to) params['to'] =to.toISOString();

    return super
      .get<{ data: SkinAnalysisHistory[] }>(
        `skin-analysis/users/${userId}/history`,
        params 
      )
      .pipe(map(r => r.data));
  }

  getZoneScore(id:number, month?:string):Observable<ZoneScore[]>{
    const params: { [key: string]: any } = {};
    if(month) params['period'] = month;
    return super.get<{data: ZoneScore[]}>(`skin-analysis/users/${id}/zone-avg`,params)
      .pipe(map(r => r.data));
  }
}
