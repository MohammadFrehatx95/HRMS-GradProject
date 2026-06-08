import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);

  events: any[] = [];
  isLoading = true;
  isAdminOrHR = false;

  newEvent = {
    title: '',
    description: '',
    eventDate: '',
    eventType: 'Company'
  };
  isSubmitting = false;

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getUpcomingEvents(60).subscribe({
      next: (data) => {
        this.events = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load upcoming events.', 'error');
      }
    });
  }

  getDaysUntil(eventDateStr: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(eventDateStr);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysLabel(days: number): string {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  }

  addEvent() {
    if (!this.newEvent.title || !this.newEvent.eventDate) {
      Swal.fire('Warning', 'Title and Date are required.', 'warning');
      return;
    }

    this.isSubmitting = true;
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire('Success', 'Event added successfully.', 'success');

        const modalEl = document.getElementById('addEventModal');
        if (modalEl) {
          (window as any).bootstrap.Modal.getInstance(modalEl)?.hide();
        }

        this.newEvent = { title: '', description: '', eventDate: '', eventType: 'Company' };
        this.loadEvents();
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire('Error', 'Failed to add event.', 'error');
      }
    });
  }

  deleteEvent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Event has been deleted.', 'success');
            this.loadEvents();
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to delete event.', 'error');
          }
        });
      }
    });
  }

  getEmpInitials(name: string): string {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  }
}
