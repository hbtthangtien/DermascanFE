import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificateService } from '../../../../services/notificate.service';
import { SubscriptionService } from '../../../../services/admin/subscription.service';
import { IdResponse } from '../../../../models/common/id-response';

@Component({
  selector: 'app-confirm-purchase',
  imports: [],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.css'
})
export class ConfirmPurchaseComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmPurchaseComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  private notiService = inject(NotificateService);
  private subscriptionService = inject(SubscriptionService);
  onConfirm() {
    console.log(this.data)
    this.subscriptionService.confirmPurchaseSubscription(this.data.id).subscribe({
        next: (resp) =>{
          this.notiService.success("Đã nâng cấp thành công");
          this.dialogRef.close(true);
        },
        error: (err)=>{
          this.notiService.error("Hệ thống đang bảo trì")
        }
    })
  }

}
