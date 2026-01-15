import {Component, HostListener} from '@angular/core';
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

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isProfileMenuOpen = false;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
