import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Statistic } from '../../models/admin/dashboard/statistic';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getDashboard(): Observable<Statistic> {
    return super.get<{ data: Statistic }>('admin/dashboard')
      .pipe(map(r => r.data));
  }
}
