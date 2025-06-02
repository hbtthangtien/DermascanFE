import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  note = '';
  send() {
    if (!this.note.trim()) return;
    alert('Cảm ơn ý kiến của bạn!');
    this.note = '';
  }
}
