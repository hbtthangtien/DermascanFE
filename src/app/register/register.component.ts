import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,11}$/)]],
        dob: ['', Validators.required]
      },
      { validators: passwordMatch }
    );
  }
  onSubmit() {
    if (this.registerForm.invalid) return;
    console.table(this.registerForm.value);
    alert('Đăng ký thành công!');
  }
}
function passwordMatch(control: AbstractControl) {
  const pw = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw === confirm ? null : { mismatch: true };
}
