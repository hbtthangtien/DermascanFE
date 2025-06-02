import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  issue = '';
  search = '';
  send() {
    if (!this.issue.trim()) return;
    alert('Đã gửi vấn đề: ' + this.issue);
    this.issue = '';
  }
  doSearch() {
    alert('Tính năng tìm kiếm chưa hỗ trợ.');
  }
}
