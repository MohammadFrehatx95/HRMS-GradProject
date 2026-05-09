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
import { PositionService } from '../../core/services/position.service';
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
  private positionService = inject(PositionService);

  allPositions: any[] = []; // lookup: positionId -> title

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
    this.loadPositionsThenEmployees();
    this.loadDepartments();
  }

  loadPositionsThenEmployees() {
    // جلب الـ positions أولاً ثم الموظفين لعمل join صحيح
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        this.allPositions = Array.isArray(res) ? res : (res?.data || []);
        this.loadEmployees();
      },
      error: () => this.loadEmployees() // تحميل الموظفين حتى لو فشل جلب الـ positions
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extracted: any[] = Array.isArray(res) ? res : (res?.data?.items || res?.data || []);
        // ربط اسم الـ position بكل موظف
        this.allEmployees = extracted.map(emp => {
          if (!emp.positionName && emp.positionId) {
            const pos = this.allPositions.find(p => p.id === emp.positionId);
            return { ...emp, positionName: pos?.title || null };
          }
          return emp;
        });
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
      const posName = emp.positionName; // نتجاهل الموظفين الذين ليس لديهم position
      if (!posName) continue; // لا نُدرجهم في الـ Positions Breakdown
      if (!this.departmentStats[deptId].positions[posName]) {
        this.departmentStats[deptId].positions[posName] = 0;
      }
      this.departmentStats[deptId].positions[posName]++;
    }
  }

  getDeptStat(deptId: number, type: 'employees' | 'positions'): number {
    if (type === 'employees') {
      const stat = this.departmentStats[deptId];
      return stat ? stat.totalEmployees : 0;
    }
    if (type === 'positions') {
      // العدّ الحقيقي من قائمة الـ positions المرتبطة بالقسم
      return this.allPositions.filter(p => p.departmentId === deptId).length;
    }
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
    const stats = this.departmentStats[dept.id] || { totalEmployees: 0 };
    this.selectedDepartment.stats = stats;
    // الـ positions الحقيقية المرتبطة بهذا القسم من الـ API
    const deptPositions = this.allPositions.filter(p => p.departmentId === dept.id);
    this.selectedDepartment.totalPositions = deptPositions.length;

    // جدول الموظفين داخل الـ modal — مع ربط الـ position
    this.deptEmployees = this.allEmployees
      .filter(e => e.departmentId === dept.id)
      .map(emp => {
        if (!emp.positionName && emp.positionId) {
          const pos = this.allPositions.find(p => p.id === emp.positionId);
          return { ...emp, positionName: pos?.title || null };
        }
        return emp;
      });
    this.filteredDeptEmployees = [...this.deptEmployees];
    // بناء قائمة الـ positions من الـ API مباشرةً وليس من الموظفين
    this.uniquePositions = deptPositions.map(p => p.title).filter(Boolean);
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
        // مقارنة بـ positionName أو عن طريق positionId
        const pos = this.allPositions.find(p => p.title === this.selectedPositionFilter);
        if (pos) {
          matchesPos = emp.positionId === pos.id;
        } else {
          matchesPos = emp.positionName === this.selectedPositionFilter;
        }
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
