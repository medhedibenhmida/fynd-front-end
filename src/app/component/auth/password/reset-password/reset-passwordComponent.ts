import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { ResetPassword } from '../../../../models/ResetPassword';
import {Auth} from '../../../../service/auth/auth';

@Component({
  selector: 'app-reset-password',
  imports: [
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './reset-passwordComponent.html',
  styleUrls: ['./reset-passwordComponent.css'] // corrige styleUrl → styleUrls
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  message = '';
  showPassword = false;
  showConfirmPassword = false;
  token: string = ''; // le token depuis l'URL

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: Auth,
              private routing: Router) {

    this.resetForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  reset() {
    this.submitted = true;

    if (!this.resetForm.valid) return;

    const payload: ResetPassword = {
      token: this.token,
      newPassword: this.resetForm.value.password
    };

    this.authService.resetPassword(payload).subscribe({
      next: () => {
        this.routing.navigate(['/login']);
      },
      error: err => {
        if (err.error) {
          this.message = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
        } else if (err.status === 400) {
          this.message = "Ce token est invalide ou déjà utilisé.";
        } else if (err.status === 403) {
          this.message = "Vous n’êtes pas autorisé à réinitialiser ce mot de passe.";
        } else {
          this.message = "Impossible de réinitialiser votre mot de passe. Merci de réessayer plus tard ou contacter le support.";
        }
      }
    });
  }



}
