import { Component } from '@angular/core';
import { Profile } from '../models/User/profile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: Profile = {
    FullName: 'Nguyễn Văn A',
    Phone: '0901234567',
    Email: 'test@email.com',
    HashPassword: '********'
  };

  avatarUrl: string = 'assets/images/default-avatar.png'; // Nếu có API lấy avatar thì gán vào đây

  // Dialog state
  showPasswordDialog = false;
  saveSuccess = false;

  // Đổi mật khẩu tạm
  newPassword = '';
  confirmPassword = '';

  // Xử lý đổi avatar (demo chỉ preview, muốn upload thì tự nối API)
  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Đổi mật khẩu: kiểm tra hợp lệ và gán vào profile.HashPassword (ở thực tế phải hash lại hoặc gọi API)
  showChangePasswordDialog() {
    this.showPasswordDialog = true;
    this.newPassword = '';
    this.confirmPassword = '';
  }
  changePassword() {
    if (this.newPassword.length < 8) {
      alert('Mật khẩu phải từ 8 ký tự trở lên!');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }
    this.profile.HashPassword = '********'; // demo thôi, thực tế phải gọi API đổi hash!
    this.showPasswordDialog = false;
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 1800);
  }

  // Lưu thông tin profile (có thể gọi API)
  saveProfile() {
    // TODO: Gửi API update profile ở đây nếu cần
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 1800);
  }
}
