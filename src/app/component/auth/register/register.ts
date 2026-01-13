import { Component } from '@angular/core';
import {UserService} from '../../../service/user/userService';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  message = '';

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  showPassword = false;
  showConfirmPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  allowNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  register() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const payload = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        phone: '+216' + this.registerForm.value.phone,
        age:this.registerForm.value.age,
        password: this.registerForm.value.password
      };

      this.userService.createUser(payload).subscribe({
        next: res => {
          this.message = 'Utilisateur créé avec succès !';
          // Redirection vers login
          this.router.navigate(['/login']);
        },
        error: err => this.message = 'Erreur lors de la création de l’utilisateur.'
      });
    } else if (this.registerForm.hasError('mismatch')) {
      this.message = 'Les mots de passe ne correspondent pas';
    } else {
      this.message = 'Merci de corriger les erreurs dans le formulaire.';
    }
  }
}
