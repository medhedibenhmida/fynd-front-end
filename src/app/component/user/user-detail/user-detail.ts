import { Component } from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../userService';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  uuid = '';
  fetchedUser: User = {} as User; // initialisé comme objet User
  message = '';

  constructor(private userService: UserService) {}

  getUser() {
    if (!this.uuid) return;

    this.userService.getUserByUuid(this.uuid).subscribe({
      next: (res) => {
        this.fetchedUser = res;
        this.message = '';
      },
      error: (err) => {
        this.message = 'Utilisateur non trouvé';
        console.error(err);
      }
    });
  }
}
