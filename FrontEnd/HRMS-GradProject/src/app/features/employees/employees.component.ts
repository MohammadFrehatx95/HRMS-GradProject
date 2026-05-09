import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  employeesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;
  selectedEmployeeProfile: any = null;

  detailsModal: any;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadEmployees();
  }

  getEmpInitials(emp: any): string {
    const name =
      emp?.fullName ||
      `${emp?.firstName || ''} ${emp?.lastName || ''}`.trim() ||
      'E';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employeesList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.employeesList = this.employeesList.filter(
              (emp) => emp.id !== id,
            );
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            Swal.fire('Error!', 'Failed to delete employee.', 'error');
          },
        });
      }
    });
  }

  viewFullDetails(emp: any) {
    this.selectedEmployeeProfile = { ...emp, isLoadingDetails: true };

    const modalElement = document.getElementById('employeeDetailsModal');
    if (modalElement) {
      this.detailsModal = new bootstrap.Modal(modalElement);
      this.detailsModal.show();
    }

    this.employeeService.getEmployeeFullProfile(emp.id).subscribe({
      next: (profile) => {
        this.selectedEmployeeProfile = {
          ...emp,
          ...profile,
          isLoadingDetails: false,
        };
      },
      error: () => {
        this.selectedEmployeeProfile = { ...emp, isLoadingDetails: false };
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee-form'], {
      state: { editMode: true, employeeId: id },
    });
  }
}
