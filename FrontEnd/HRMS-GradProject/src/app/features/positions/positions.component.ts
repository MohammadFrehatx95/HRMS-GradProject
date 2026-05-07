import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionService } from '../../core/services/position.service';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionService = inject(PositionService);
  private departmentService = inject(DepartmentService);

  positionsList: any[] = [];
  departmentsList: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  positionModal: any;
  isEditMode: boolean = false;
  currentPositionId: number | null = null;

  positionData = {
    title: '',
    departmentId: null as number | null,
    salaryMin: 0,
    salaryMax: 0,
  };

  ngOnInit() {
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.departmentsList = Array.isArray(extracted) ? extracted : [];
      },
      error: (err) => console.error('Error fetching departments:', err),
    });
  }

  loadPositions() {
    this.isLoading = true;
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.positionsList = Array.isArray(extracted) ? extracted : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching positions:', err);
        this.isLoading = false;
      },
    });
  }

  getDepartmentName(deptId: number): string {
    const dept = this.departmentsList.find((d) => d.id === deptId);
    return dept ? dept.name : `Dept #${deptId}`;
  }

  openModal(position: any = null) {
    if (position) {
      this.isEditMode = true;
      this.currentPositionId = position.id;
      this.positionData = {
        title: position.title,
        departmentId: position.departmentId,
        salaryMin: position.salaryMin,
        salaryMax: position.salaryMax,
      };
    } else {
      this.isEditMode = false;
      this.currentPositionId = null;
      this.positionData = {
        title: '',
        departmentId: null,
        salaryMin: 0,
        salaryMax: 0,
      };
    }

    const modalEl = document.getElementById('positionModal');
    if (modalEl) {
      this.positionModal = new bootstrap.Modal(modalEl);
      this.positionModal.show();
    }
  }

  savePosition() {
    this.isProcessing = true;

    if (this.isEditMode && this.currentPositionId) {
      this.positionService
        .updatePosition(this.currentPositionId, this.positionData)
        .subscribe({
          next: () => this.handleSuccess('Position updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      this.positionService.createPosition(this.positionData).subscribe({
        next: () => this.handleSuccess('Position created successfully'),
        error: (err) => this.handleError(err),
      });
    }
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
        this.positionService.deletePosition(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Position has been deleted.', 'success');
            this.loadPositions();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Failed to delete position.', 'error');
          },
        });
      }
    });
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.positionModal.hide();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadPositions();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Position save error:', err);
    Swal.fire('Error', 'Failed to save position data.', 'error');
  }
}
