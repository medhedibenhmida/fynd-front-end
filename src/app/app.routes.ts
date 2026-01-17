import { Routes } from '@angular/router';
import {Layout} from './component/layout/layout';
import {Register} from './component/auth/register/register';
import {Login} from './component/auth/login/login';
import {ForgotPassword} from './component/auth/password/forgot-password/forgot-password';
import {ResetPasswordComponent} from './component/auth/password/reset-password/reset-passwordComponent';
import {Home} from './component/home/home';
import { authGuard } from './guards/auth-guard';
import {Profile} from './component/profile/profile';
import {Activity} from './component/activity/activity';

export const routes: Routes = [{
  path: '',
  component: Layout,
  children: [
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'reset-password', component: ResetPasswordComponent }
  ]
},{path: 'home',
  component: Home,
  canActivate: [authGuard],
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'profile', component: Profile },
    { path: 'activity', component: Activity }
  ] },
  { path: '**', redirectTo: 'login' }];
