import {Component, ChangeDetectorRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../service/auth/auth';

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
  styleUrls: ['./forgot-password.css'], // ✅ corrigé
})
export class ForgotPassword {

  forgotPasswordForm: FormGroup;
  submitted = false;
  message = '';
  constructor(private fb: FormBuilder, private authService: Auth, private cd: ChangeDetectorRef,private ngZone: NgZone) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]]
    });
  }

  protected generateNewPassword() {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      const payload = { email: this.forgotPasswordForm.value.email };

      this.authService.forgotPassword(payload).subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.message = "Si un compte existe avec cet email, un email vous sera envoyé.";
            this.cd.detectChanges();
            this.forgotPasswordForm.reset();
            this.submitted = false;
          });
        },
        error: (err) => {
          this.message = err.error?.message || '';
          this.cd.detectChanges();
        }
      });
    }
  }
}
