import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRegister } from '../../models/User/user-register';
import { BaseService } from '../../services/base-service.service';
import { IdResponse } from '../../models/common/id-response';
import { NotificateService } from '../../services/notificate.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errors: string | undefined;
  private http = inject(AccountService);
  private notificateService = inject(NotificateService);
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,11}$/)]],
        fullname:['',[Validators.required]]
      },
      { validators: passwordMatch }
    );
  }
  onSubmit() {   
    if (this.registerForm.invalid) return;
    const body : UserRegister = {
      email : this.registerForm.get('email')?.value,
      hashPassword: this.registerForm.get('password')?.value,
      phone: this.registerForm.get('phone')?.value,
      fullName: this.registerForm.get('fullname')?.value
    };
    this.http.CreateAccount('accounts',body).subscribe({
        next:(resp) =>{
            this.notificateService.success("Đăng ký thành công");            
        },
        error: (err) =>{
            this.notificateService.error("Đăng ký lỗi");
            this.errors = err.error.message;
        },
    })
  }
}
function passwordMatch(control: AbstractControl) {
  const pw = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw === confirm ? null : { mismatch: true };
}
