import { Component, OnInit, inject } from '@angular/core';
import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  departmentsList: any[] = [];
  isLoading: boolean = true;
  private departmentService = inject(DepartmentService);

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
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
}
