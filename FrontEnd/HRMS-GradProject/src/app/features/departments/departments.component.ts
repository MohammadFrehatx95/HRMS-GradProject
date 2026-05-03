import { Component, OnInit, inject } from '@angular/core';
import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  departmentsList: any[] = [];

  private departmentService = inject(DepartmentService);

  ngOnInit() {
    this.departmentsList = this.departmentService.getDepartments();
  }
}
