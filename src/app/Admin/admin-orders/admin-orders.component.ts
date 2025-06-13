import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderView, UserPlanStatus } from '../../models/admin/SubscriptionOrder/purchase-order-view';
import { SubscriptionService } from '../../services/admin/subscription.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPurchaseComponent } from './dialog/confirm-purchase/confirm-purchase.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orders: PurchaseOrderView[] = [];
  keyword = '';
  statusFilter: PurchaseOrderView['status'] | '' = '';
  statuses: PurchaseOrderView['status'][] = ['Active', 'Pending', 'Expired', 'Canceled', 'Trial', 'Failed'];

  constructor(private orderSvc: SubscriptionService, public dialogRef: MatDialog) { }
  ngOnInit() { this.orderSvc.getOrders().subscribe(o => (this.orders = o.data)); }

  filtered(): PurchaseOrderView[] {
    return this.orders.filter(o => {
      const k = this.keyword.toLowerCase();
      const keyMatch = k ? (o.id + o.fullName + o.code).toLowerCase().includes(k) : true;
      const statusMatch = this.statusFilter ? o.status === this.statusFilter : true;
      return keyMatch && statusMatch;
    });
  }

  badge(s: PurchaseOrderView['status']): string {
    const map: Record<string, string> = {
      Active: 'bg-emerald-100 text-emerald-700',
      Pending: 'bg-amber-100 text-amber-700',
      Expired: 'bg-gray-200 text-gray-600',
      Canceled: 'bg-red-100 text-red-700',
      Trial: 'bg-sky-100 text-sky-700',
      Failed: 'bg-red-200 text-red-800'
    };
    const key = typeof s === 'number' ? UserPlanStatus[s] : s;
    return map[key] || 'bg-gray-100 text-gray-600';
  };

  markPaid(o: PurchaseOrderView) {
    this.dialogRef.open(ConfirmPurchaseComponent, {
      width: '400px',
      height: '200px',
      data: {
        id: o.id
      }
    });
  }
}
