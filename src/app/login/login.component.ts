import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseService } from '../services/base-service.service';
import { LoginRequest } from '../models/Auth/login-request';
import { NotificateService } from '../services/notificate.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  errorMessage: string | undefined;
  private notificateService = inject(NotificateService);
  private authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

  }
  onSubmit() {
    const pwCtrl = this.loginForm.get('password');
    const body : LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    console.log(body);
    this.authService.login(body).subscribe({
        next: (resp) =>{
            this.notificateService.success("Đăng nhập thành công",1000);
        },
        error: (err) => {
          pwCtrl?.setErrors({ incorrect: true });
          this.errorMessage = err.error.message;
          this.notificateService.error("Đăng nhập lỗi");
        }
    });
  }
}
