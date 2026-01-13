import { Routes } from '@angular/router';
import {Layout} from './component/layout/layout';
import {Register} from './component/auth/register/register';
import {Login} from './component/auth/login/login';

export const routes: Routes = [{
  path: '',
  component: Layout,
  children: [
    { path: 'register', component: Register },
    { path: 'login', component: Login }
  ]
},
  { path: '**', redirectTo: '' }];
