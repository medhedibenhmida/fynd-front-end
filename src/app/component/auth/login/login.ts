import { Component } from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../user/userService';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  message = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', Validators.required],
    });
  }


  showPassword = false;

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.loginForm.value));
  }
}
