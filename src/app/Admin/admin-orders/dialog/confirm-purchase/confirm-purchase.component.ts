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
    this.subscriptionService
  }

}
