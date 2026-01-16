import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterOutlet, Router, RouterLink} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../service/user/userService';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isSidebarClosed = false;
  isProfileMenuOpen = false;
  currentUser?: User;
  userAvatar: string = '';

  constructor(private router: Router,private userService: UserService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user.profilePicture) {
          this.userAvatar = `http://localhost:8080${user.profilePicture}`;
          this.cdr.detectChanges();
        } else {
          this.userAvatar = '/assets/images/default-avatar.png';
          }
        },
      error: (err) => {
        console.error('Erreur récupération utilisateur:', err);
      }
    });
  }

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
