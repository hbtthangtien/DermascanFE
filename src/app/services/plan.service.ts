import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/common/base-response';
import { Plan } from '../models/SubscriptionPlan/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
  getPlans():Observable<BaseResponse<Plan[]>>{
      return super.get('subscription-plan');
  }
}
