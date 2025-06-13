import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  showSuccessDialog = false;
  note = '';

  send() {
    // Thực tế nên validate note.length, gửi API tại đây!
    if (!this.note || this.note.trim().length < 5) {
      alert('Vui lòng nhập nội dung góp ý!');
      return;
    }
    // Gửi API xong thì hiển thị dialog cảm ơn
    this.showSuccessDialog = true;
    this.note = '';
    // Tự động ẩn sau 3s nếu muốn:
    setTimeout(() => this.showSuccessDialog = false, 3000);
  }
}
