import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-activity',
  imports: [
    DatePipe,
    NgClass,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './activity.html',
  styleUrl: './activity.css',
})
export class Activity {
  searchText = '';
  filterStatus = '';
  filterType = '';
  filterLocation = '';
  showModal = false;
  activityForm: FormGroup;
  minDateTime: string='';

  activities: IActivity[] = [
    { id:1, title: 'Yoga', description: 'Séance de yoga détente', location: 'Parc', type: 'Yoga', created_at: new Date('2026-01-10'), activityStatus: 'ACTIVE' },
    { id:2, title: 'Workshop Angular', description: 'Atelier développement Angular', location: 'Salle', type: 'Workshop', created_at: new Date('2026-01-12'), activityStatus: 'PENDING' },
    { id:3, title: 'Course Running', description: 'Course du dimanche matin', location: 'Parc', type: 'Running', created_at: new Date('2026-01-14'), activityStatus: 'CANCELLED' },
    { id:4, title: 'Lecture Club', description: 'Discussion autour d’un livre', location: 'Maison', type: 'Lecture', created_at: new Date('2026-01-08'), activityStatus: 'ACTIVE' }
  ];
  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      type: ['Yoga', Validators.required],
      activityStatus: ['ACTIVE', Validators.required],
      isPrivate: [false],
      plannedDate: ['', [Validators.required, this.futureDateValidator]],
      maxParticipants: [10, [Validators.required, Validators.min(1),Validators.max(100)]],
      genderPreference: ['Tous', Validators.required]
    });
  }
  ngOnInit() {
    const now = new Date();
    now.setHours(now.getHours() + 1); // +1h
    // format YYYY-MM-DDTHH:mm
    this.minDateTime = now.toISOString().slice(0,16);
  }

  updateMinDateTime() {
    const now = new Date();
    now.setHours(now.getHours() + 1); // +1h minimum si c’est aujourd’hui
    this.minDateTime = now.toISOString().slice(0,16); // YYYY-MM-DDTHH:mm
  }

  clearFilters() {
    this.searchText = '';
    this.filterStatus = '';
    this.filterType = '';
    this.filterLocation = '';
  }
  openModal(event: Event) {
    event.stopPropagation();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.activityForm.reset();
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const now = new Date();
    if (selectedDate < now) return { invalidDate: true };

    // Si c’est aujourd’hui, doit être au moins 1h plus tard
    if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedDate.getTime() - now.getTime() < 3600000
    ) {
      return { invalidDate: true };
    }

    return null;
  }
  submitActivity() {
    console.log("Formulaire soumis !");
  }

}
