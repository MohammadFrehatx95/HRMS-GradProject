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

  allEmployeesList: any[] = [];
  employeesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  selectedEmployeeProfile: any = null;

  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  uniqueDepartments: string[] = [];

  detailsModal: any;

  ngOnInit() {
    this.isAdmin     = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
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
        this.allEmployeesList = data;
        this.employeesList = [...this.allEmployeesList];
        
        const depts = data.map((e: any) => e.departmentName || e.departmentId).filter(Boolean);
        this.uniqueDepartments = Array.from(new Set(depts)) as string[];
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }

  filterEmployees() {
    this.employeesList = this.allEmployeesList.filter(emp => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        const deptStr = String(emp.departmentName || emp.departmentId || '').toLowerCase();
        
        matchesSearch = fullName.includes(query) || idStr.includes(query) || deptStr.includes(query);
      }
      
      let matchesDept = true;
      if (this.selectedDepartment) {
        matchesDept = (emp.departmentName || String(emp.departmentId)) === this.selectedDepartment;
      }
      
      let matchesStatus = true;
      if (this.selectedStatus) {
        matchesStatus = (this.selectedStatus === 'Active') ? emp.isActive : !emp.isActive;
      }
      
      return matchesSearch && matchesDept && matchesStatus;
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
