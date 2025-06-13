import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
doSearch() {
throw new Error('Method not implemented.');
}
  showSuccessDialog = false;
  issue = '';
  search = '';

  send() {
    if (!this.issue || this.issue.trim().length < 5) {
      alert('Vui lòng mô tả vấn đề bạn gặp phải!');
      return;
    }
    // Gửi API ở đây nếu có
    this.showSuccessDialog = true;
    this.issue = '';
    // Tự động tắt dialog sau 2.5s (có thể bỏ nếu thích bấm tay)
    setTimeout(() => this.showSuccessDialog = false, 2500);
  }
}
