import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseVietQr } from '../models/VietQr/response-viet-qr';
import { RequestVietQr } from '../models/VietQr/request-viet-qr';
import { BaseResponse } from '../models/common/base-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService{

  constructor(http: HttpClient) {
      super(http);
   }

   purchasePlan(body: RequestVietQr):Observable<BaseResponse<ResponseVietQr>>{
        return super.post<BaseResponse<ResponseVietQr>>('subscription-plan',body);
   }
}
