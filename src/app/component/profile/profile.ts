import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../service/user/userService';
import {NgClass, NgIf} from '@angular/common';

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
  message: string = '';
  userAvatar: string = '';
  currentUser?: User;

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
    console.log('clicked')

    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      console.log(updatedUser);
      // @ts-ignore
      this.userService.updateUser(this.currentUser.uuid, updatedUser)
        .subscribe({
          next: (user) => {
            this.message = 'Utilisateur mis à jour avec succès !';
            console.log('Utilisateur mis à jour :', user);
            this.currentUser = user;
          },
          error: (err) => {
            this.message = 'Erreur lors de la mise à jour : ' + (err.error || err.message);
            console.error(err);
          }
        });
    }
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
