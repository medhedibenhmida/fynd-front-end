import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {email} from '@angular/forms/signals';
import {Auth} from '../../../../service/auth/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  forgotPasswordForm: FormGroup;
  submitted = false;
  message = '';

  constructor(private fb: FormBuilder,private authService : Auth) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]]
    });
  }

  protected generateNewPassword() {
    console.log("here");
    if (this.forgotPasswordForm.valid) {
      const payload = {
        email: this.forgotPasswordForm.value.email
      };
      this.authService.forgotPassword(payload).subscribe({
        next: (res) => {
          this.message = "Si un compte existe avec cet email, un email vous sera envoyé.";
        },
        error: (err) => {
          this.message = err.error?.message || '';
        }
      });
    }
  }
}
