import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule
} from '@angular/forms';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);

  departmentsList: any[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  currentDepartmentId: number | null = null;

  selectedDepartment: any = null;
  private detailsModal: any;
  private addModalInstance: any;
  
  allEmployees: any[] = [];
  departmentStats: any = {}; // id -> { totalEmployees: 0, positions: { posName: count } }
  
  deptEmployees: any[] = [];
  filteredDeptEmployees: any[] = [];
  searchEmpQuery: string = '';
  selectedPositionFilter: string = '';
  uniquePositions: string[] = [];

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : (res?.data?.items || res?.data || []);
        this.allEmployees = extracted;
        this.calculateStats();
      }
    });
  }

  calculateStats() {
    this.departmentStats = {};
    for (const emp of this.allEmployees) {
      const deptId = emp.departmentId;
      if (!deptId) continue;
      
      if (!this.departmentStats[deptId]) {
        this.departmentStats[deptId] = { totalEmployees: 0, positions: {} };
      }
      
      this.departmentStats[deptId].totalEmployees++;
      const posName = emp.positionName || 'Unknown';
      if (!this.departmentStats[deptId].positions[posName]) {
        this.departmentStats[deptId].positions[posName] = 0;
      }
      this.departmentStats[deptId].positions[posName]++;
    }
  }

  getDeptStat(deptId: number, type: 'employees' | 'positions'): number {
    const stat = this.departmentStats[deptId];
    if (!stat) return 0;
    if (type === 'employees') return stat.totalEmployees;
    if (type === 'positions') return Object.keys(stat.positions).length;
    return 0;
  }

  loadDepartments() {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.departmentsList = extracted;
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
    const stats = this.departmentStats[dept.id] || { totalEmployees: 0, positions: {} };
    this.selectedDepartment.stats = stats;
    this.selectedDepartment.positionsList = Object.keys(stats.positions).map(k => ({
      name: k, count: stats.positions[k]
    })).sort((a, b) => b.count - a.count);

    // Setup employees table for this department
    this.deptEmployees = this.allEmployees.filter(e => e.departmentId === dept.id);
    this.filteredDeptEmployees = [...this.deptEmployees];
    this.uniquePositions = [...new Set(this.deptEmployees.map(e => e.positionName).filter(Boolean))];
    this.searchEmpQuery = '';
    this.selectedPositionFilter = '';

    setTimeout(() => {
      const modalElement = document.getElementById('deptDetailsModal');
      if (modalElement) {
        this.detailsModal = new bootstrap.Modal(modalElement);
        this.detailsModal.show();
      }
    }, 0);
  }

  filterDeptEmployees() {
    this.filteredDeptEmployees = this.deptEmployees.filter(emp => {
      let matchesSearch = true;
      if (this.searchEmpQuery) {
        const query = this.searchEmpQuery.toLowerCase();
        const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        matchesSearch = fullName.includes(query) || idStr.includes(query);
      }

      let matchesPos = true;
      if (this.selectedPositionFilter) {
        matchesPos = emp.positionName === this.selectedPositionFilter;
      }

      return matchesSearch && matchesPos;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDepartmentId = null;
    this.addForm.reset();
    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  openEditModal(dept: any) {
    this.isEditMode = true;
    this.currentDepartmentId = dept.id;
    this.addForm.patchValue({ name: dept.name });
    
    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  saveDepartment() {
    if (this.addForm.invalid) {
      Swal.fire('Warning', 'Please enter a valid department name.', 'warning');
      return;
    }

    this.isSubmitting = true;
    const payload = this.addForm.getRawValue();

    if (this.isEditMode && this.currentDepartmentId) {
      this.departmentService.updateDepartment(this.currentDepartmentId, payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.addModalInstance.hide();
          Swal.fire('Success', 'Department updated successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.isSubmitting = false;
          const msg = err.error?.message || 'Failed to update department';
          Swal.fire('Error', msg, 'error');
        },
      });
    } else {
      this.departmentService.addDepartment(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.addModalInstance.hide();
          Swal.fire('Success', 'Department added successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.isSubmitting = false;
          const msg = err.error?.message || 'Failed to add department';
          Swal.fire('Error', msg, 'error');
        },
      });
    }
  }

  deleteDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This department and all associated data might be affected. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            console.error('Delete error:', err);
            const msg = err.error?.message || 'Failed to delete department.';
            Swal.fire('Error!', msg, 'error');
          }
        });
      }
    });
  }
}
