import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderView, UserPlanStatus } from '../../models/admin/SubscriptionOrder/purchase-order-view';
import { SubscriptionService } from '../../services/admin/subscription.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPurchaseComponent } from './dialog/confirm-purchase/confirm-purchase.component';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
  animations: [
    trigger('badgePulse', [
      transition('* => Active', [
        style({ boxShadow: '0 0 0 0 #10b98133' }),
        animate('0.1s cubic-bezier(.36,2,.64,.7)', style({ boxShadow: '0 0 0 8px #10b98122' }))
      ]),
      transition('* => Pending', [
        style({ boxShadow: '0 0 0 0 #fbbf2444' }),
        animate('0.1s cubic-bezier(.36,2,.64,.7)', style({ boxShadow: '0 0 0 8px #fbbf2444' }))
      ])
    ])
  ],
})
export class AdminOrdersComponent implements OnInit {
  orders: PurchaseOrderView[] = [];
  keyword = '';
  statusFilter: PurchaseOrderView['status'] | '' = '';
  statuses: PurchaseOrderView['status'][] = ['Active', 'Pending', 'Expired', 'Canceled', 'Trial', 'Failed'];

  constructor(private orderSvc: SubscriptionService, public dialogRef: MatDialog) { }
  ngOnInit() {
    this.orderSvc.getOrders().subscribe(o => (this.orders = o.data));
    console.log('Order API:', this.orders);
  }

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
    const dialogRef = this.dialogRef.open(ConfirmPurchaseComponent, {
      width: '400px',
      height: '200px',
      data: {
        id: o.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    })
  }
  // --- Phân trang ---
  page = 1;
  pageSize = 8; // Số dòng trên mỗi trang

  pagedOrders() {
    const data = this.filtered();
    const start = (this.page - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filtered().length / this.pageSize) || 1;
  }

  pagesArray() {
    const t = this.totalPages();
    // Hiển thị tối đa 5 nút trang: ... 2 3 [4] 5 6 ...
    const pages: number[] = [];
    let from = Math.max(1, this.page - 2);
    let to = Math.min(t, this.page + 2);
    if (to - from < 4) {
      if (from === 1) to = Math.min(t, from + 4);
      else from = Math.max(1, to - 4);
    }
    for (let i = from; i <= to; i++) pages.push(i);
    return pages;
  }

  gotoPage(p: number) {
    this.page = p;
  }

}
