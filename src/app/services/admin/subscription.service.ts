import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/common/base-response';
import { PurchaseOrderView } from '../../models/admin/SubscriptionOrder/purchase-order-view';
import { IdResponse } from '../../models/common/id-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  getOrders() : Observable<BaseResponse<PurchaseOrderView[]>> {
      return super.get<BaseResponse<PurchaseOrderView[]>>('admin/subscriptions');
  }

  constructor(http: HttpClient) {
    super(http);
  }
  
  confirmPurchaseSubscription(id: number):Observable<IdResponse>{
      return super.put<IdResponse>('admin/subscriptions',id,{});
  }
}
