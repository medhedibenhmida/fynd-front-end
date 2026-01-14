import { Routes } from '@angular/router';
import {Layout} from './component/layout/layout';
import {Register} from './component/auth/register/register';
import {Login} from './component/auth/login/login';
import {ForgotPassword} from './component/auth/password/forgot-password/forgot-password';
import {ResetPassword} from './component/auth/password/reset-password/reset-password';

export const routes: Routes = [{
  path: '',
  component: Layout,
  children: [
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'reset-password', component: ResetPassword }
  ]
},
  { path: '**', redirectTo: '' }];
