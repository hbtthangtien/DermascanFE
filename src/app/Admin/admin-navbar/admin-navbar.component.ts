import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
// Trong component .ts


export class AdminNavbarComponent implements AfterViewInit {
  private authService = inject(AuthService);
  navOpen = false;
  showDropdown = false;
  showNotif = false;
  unreadCount = 2; // Số thông báo chưa đọc
  notifications = [
    { text: "Bạn có đơn hàng mới!", read: false },
    { text: "Người dùng Minh vừa đăng ký tài khoản.", read: false },
    { text: "Đơn #123 đã được xử lý.", read: true }
  ];

  // Stripe underline động (như Stripe)
  @ViewChild('tab1', { static: false }) tab1!: ElementRef;
  @ViewChild('tab2', { static: false }) tab2!: ElementRef;
  @ViewChild('tab3', { static: false }) tab3!: ElementRef;
  stripeStyle = {};

  ngAfterViewInit() {
    setTimeout(() => this.updateStripe(), 100); // Chờ DOM render
  }

  // Cập nhật vị trí underline động (Stripe)
  updateStripe() {
    // Tìm tab đang active
    let activeTab = this.tab1?.nativeElement.classList.contains('active') ? this.tab1 :
                    this.tab2?.nativeElement.classList.contains('active') ? this.tab2 :
                    this.tab3?.nativeElement.classList.contains('active') ? this.tab3 : null;
    if (activeTab) {
      const rect = activeTab.nativeElement.getBoundingClientRect();
      const parentRect = activeTab.nativeElement.parentElement.parentElement.getBoundingClientRect();
      this.stripeStyle = {
        width: rect.width + 'px',
        left: (rect.left - parentRect.left) + 'px',
        opacity: 1
      };
    } else {
      this.stripeStyle = { opacity: 0 };
    }
  }

  // Notification
  toggleNotification() {
    this.showNotif = !this.showNotif;
    if (this.showNotif) this.showDropdown = false;
  }
  markAsRead(idx: number) {
    this.notifications[idx].read = true;
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }
  clearAllNotif() {
    this.notifications.forEach(n => n.read = true);
    this.unreadCount = 0;
  }

  // Dropdown account
  logout() {
    // ... Xử lý logout
    this.authService.logout();
    this.showDropdown = false;
  }
}

