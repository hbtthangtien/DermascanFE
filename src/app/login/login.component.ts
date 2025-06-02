import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    console.log('🔐 SUBMIT', this.loginForm.value); 
    if (this.loginForm.invalid) return;

    const pwCtrl = this.loginForm.get('password');
    if (pwCtrl?.value !== 'correctPassword') {
      pwCtrl?.setErrors({ incorrect: true });
      return;
    }
    // TODO: integrate authentication service
  }
}
