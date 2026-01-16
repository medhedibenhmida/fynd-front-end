import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../service/user/userService';
import {NgClass, NgIf} from '@angular/common';
import {UserStatus} from '../../enums/UserStatus';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ]
})
export class Profile implements OnInit {

  userForm: FormGroup;
  user: User | null = null;
  message: string = '';
  userAvatar: string = 'assets/images/default-avatar.png';
  currentUser?: User;
  UserStatus = UserStatus;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userAvatar = 'http://localhost:8080' + (user.profilePicture || '/assets/images/default-avatar.png');

        console.log(this.userAvatar);
        console.log(this.currentUser)
        this.userForm.patchValue({
          firstName:this.currentUser.firstName,
          lastName:this.currentUser.lastName,
          email: this.currentUser.email,
          age : this.currentUser.age,
          phone:this.currentUser.phone
        });
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur:', err);
      }
    });
  }

  updateProfile(): void {
    if (this.userForm.valid && this.user) {
      const updatedUser: Partial<User> = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        phone: this.userForm.value.phone
      };
    }
  }

  // Changer l'avatar
  changeAvatar(): void {
    // Ici tu peux ouvrir un file input ou modal pour uploader l'avatar
    console.log('Changer l’avatar (non implémenté)');
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez choisir un fichier image valide');
      return;
    }

    // Prévisualiser immédiatement
    const reader = new FileReader();
    reader.onload = () => {
      this.userAvatar = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Préparer l'upload
    const formData = new FormData();
    formData.append('file', file);

    this.userService.uploadAvatar(formData).subscribe({
      next: (url) => {
        this.userAvatar = url; // mettre à jour avec l'URL finale du backend
        console.log('Avatar uploadé:', url);
      },
      error: (err) => console.error('Erreur upload avatar:', err)
    });
  }

}
