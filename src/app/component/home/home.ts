import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterOutlet,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isSidebarClosed = false;
  isProfileMenuOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
