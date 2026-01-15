import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

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

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
