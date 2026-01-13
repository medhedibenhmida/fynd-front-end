import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-password',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {
  @Input() control!: FormControl;
  @Input() placeholder: string = 'Mot de passe';
  show: boolean = false;

  toggle() { this.show = !this.show; }
}
