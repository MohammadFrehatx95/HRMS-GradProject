import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);

  departmentsList: any[] = [];
  isLoading: boolean = true;

  selectedDepartment: any = null;
  private detailsModal: any;

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departmentsList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.isLoading = false;
      },
    });
  }

  viewDetails(dept: any) {
    this.selectedDepartment = dept;

    setTimeout(() => {
      const modalElement = document.getElementById('deptDetailsModal');
      if (modalElement) {
        this.detailsModal = new bootstrap.Modal(modalElement);
        this.detailsModal.show();
      }
    }, 0);
  }
}
