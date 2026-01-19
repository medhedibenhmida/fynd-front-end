import {ChangeDetectorRef, Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {IActivity} from '../../models/IActivity';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {ActivityApprovalStatus} from '../../enums/ActivityApprovalStatus';
import {ActivityService} from '../../service/activity/activity-service';

@Component({
  selector: 'app-activity',
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgClass
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
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  activities: IActivity[] = [
    { id:1, title: 'Yoga',  type: 'Yoga',  activityApprovalStatus: ActivityApprovalStatus.ACCEPTED },
    { id:2, title: 'Workshop Angular', location: 'Salle', type: 'Workshop',activityApprovalStatus: ActivityApprovalStatus.PENDING },
    { id:3, title: 'Course Running',  location: 'Parc', type: 'Running',  activityApprovalStatus: ActivityApprovalStatus.REJECTED },
    { id:4, title: 'Lecture Club',  location: 'Maison', type: 'Lecture',  activityApprovalStatus: ActivityApprovalStatus.ACCEPTED }
  ];
  protected submitted: boolean  = false;

  constructor(private fb: FormBuilder,private activityService:ActivityService,private cd: ChangeDetectorRef) {
    this.activityForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      plannedDate: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      isPrivate: [false],
      maxParticipants: [2, [Validators.required, Validators.min(2), Validators.max(100)]],
      notes: ['', [Validators.maxLength(400)]]
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
    now.setHours(now.getHours() + 1);
    this.minDateTime = now.toISOString().slice(0,16);
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
    this.message = '';
    this.activityForm.reset({
      title: '',
      location: '',
      notes: '',
      type: '',
      isPrivate: false,
      plannedDate: '',
      maxParticipants: '2'
    });
    this.submitted = false;
    this.updateMinDateTime();
    this.cd.detectChanges();
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const now = new Date();
    if (selectedDate < now) return { invalidDate: true };

    if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedDate.getTime() - now.getTime() < 3600000
    ) {
      return { invalidDate: true };
    }

    return null;
  }
  submitActivity() {
    this.submitted = true;

    if (this.activityForm.valid) {
      const newActivity: IActivity = this.activityForm.value;
      this.activityService.createActivity(newActivity).subscribe({
        next: (res) => {
          this.message = `Activité créée avec succès, en attente de validation.`;
          this.messageType = 'success';

          this.activityForm.reset({
            title: '',
            location: '',
            type: '',
            notes: '',
            isPrivate: false,
            plannedDate: '',
            maxParticipants: '2'
          });
          this.submitted = false;

          this.updateMinDateTime();
        },
        error: (err) => {
          console.log("Erreur backend:", err);

          console.log("Erreur backend:", err.error?.message);
          this.messageType = 'error';
          this.message = err.error?.message || "Erreur lors de la création de l’activité.";

          this.cd.detectChanges();
        }
      });
    }
  }

  protected viewDetails(id: number) {
    console.log(id);
  }
}
