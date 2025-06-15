import { Component, inject, OnInit } from '@angular/core';
import { Profile } from '../../models/User/profile';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserClaim } from '../../models/User/user-claim';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private currentUser$: Observable<UserClaim | null>;
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private userId: number = 0;
  profile: Profile = {
    FullName: 'Nguyễn Văn A',
    Phone: '0901234567',
    Email: 'test@email.com',
    HashPassword: '********',
    imageUrl: ''
  };
  originalProfile: Profile = {
    FullName: '',
    Phone: '',
    Email: '',
    HashPassword: '',
    imageUrl: ''
  };
  selectedFile: File | undefined;// Nếu có API lấy avatar thì gán vào đây
  // Dialog state
  showPasswordDialog = false;
  saveSuccess = false;
  // Đổi mật khẩu tạm
  newPassword = '';
  confirmPassword = '';
  errorMessage: string | undefined;
  errorStatus = false;
  constructor() {
    this.currentUser$ = this.authService.currentUser$;
    this.currentUser$.subscribe({
      next: (u) => {
        const loadedProfile: Profile = {
          FullName: u!.Fullname,
          Email: u!["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          imageUrl: u!.Image,
          Phone: u!.Phone,
          HashPassword: '********'
        };
        this.profile = { ...loadedProfile };
        this.originalProfile = { ...loadedProfile };
        this.userId = u!.UserId;
      }
    });
  }
  // Xử lý đổi avatar (demo chỉ preview, muốn upload thì tự nối API)
  onAvatarChange(event: any) {
    const file = event.target.files[0];
    console.log(event);
    if (file) {
      const reader = new FileReader();
      this.selectedFile = file;
      reader.onload = (e: any) => {
        this.profile.imageUrl = e.target.result;
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
      this.errorStatus = true;
      this.errorMessage = "Mật khẩu phải ít nhất 8 ký tự và chứa ít nhất 1 chữ, số và ký tự đặc biệt";
      setTimeout(() => this.errorStatus = false, 1800);
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorStatus = true;
      this.errorMessage = "Mật khẩu nhập lại không khớp";
      setTimeout(() => this.errorStatus = false, 1800);
      return;
    }
    const formData = new FormData();
    formData.append('HashPassword', this.newPassword);
    this.accountService.UpdateProfile('profile', this.userId, formData).subscribe({
      next: (resp) => {
        this.profile.HashPassword = '********';
        this.showPasswordDialog = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 1800);
      },
      error: (err) => {
        this.errorStatus = true;
        this.errorMessage = '' + (err.error?.message !== undefined ? err.error.message : 'Có lỗi xảy ra, Vui lòng thử lại sau');
        setTimeout(() => this.errorStatus = false, 1800);
      }
    })

  }

  // Lưu thông tin profile (có thể gọi API)
  saveProfile() {
    if (this.profile.FullName.length <= 0) {
      this.errorStatus = true;
      this.errorMessage = "Họ và Tên không được bỏ trống";
      setTimeout(() => this.errorStatus = false, 1800);
      return;
    }
    if (this.profile.Phone.length <= 0) {
      this.errorStatus = true;
      this.errorMessage = "Số điện thoại không được bỏ trống";
      setTimeout(() => this.errorStatus = false, 1800);
      return;
    }
    const formData = new FormData();
    formData.append('FullName', this.profile.FullName);
    formData.append('Phone', this.profile.Phone);
    if (this.selectedFile !== undefined) formData.append('ImageFile', this.selectedFile);
    this.accountService.UpdateProfile('profile', this.userId, formData).subscribe({
      next: (respParent) => {
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 1800);
        this.authService.refreshToken().subscribe({
          next: (resp) => {
            localStorage.setItem('authToken', JSON.stringify(resp.data));
            this.authService.restoreUser();
          }
        });
      },
      error: (err) => {
        this.errorStatus = true;
        this.errorMessage = '' + (err.error?.message !== undefined ? err.error.message : 'Có lỗi xảy ra, Vui lòng thử lại sau');
        setTimeout(() => this.errorStatus = false, 1800);
      }
    });

  }
  isProfileChanged(): boolean {
    return (
      this.profile.FullName !== this.originalProfile.FullName ||
      this.profile.Phone !== this.originalProfile.Phone ||
      this.selectedFile !== undefined // nếu đổi ảnh đại diện
    );
  }
}
