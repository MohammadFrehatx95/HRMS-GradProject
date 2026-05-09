import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  isEditMode = false;
  currentEmployeeId: number | null = null;
  departments: any[] = [];
  positions: any[] = [];
  unassignedUsers: any[] = [];

  // بيانات الـ user المرتبط (يستخدم في Edit mode لعرض المعلومات)
  linkedUserInfo: { username: string; email: string; role: string } | null = null;

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    const state = window.history.state;

    if (state && state.editMode && state.employeeId) {
      // ─── EDIT MODE ───
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      // userId لا يُعدَّل في Edit mode
      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {
      // ─── ADD MODE ───
      // إذا جاء userId / email من navigation state (طريقة قديمة)
      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }
      // تعطيل الإيميل لأنه يتعبى أوتوماتيك من الـ dropdown
      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      // عند تغيير userId (اختيار user من الـ dropdown)، نعبي الإيميل أوتوماتيك
      this.employeeForm.get('userId')?.valueChanges.subscribe((selectedId) => {
        const user = this.unassignedUsers.find(
          (u) => String(u.id) === String(selectedId),
        );
        if (user) {
          this.employeeForm.get('email')?.setValue(user.email);
        }
      });
    }

    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      }
    });
  }

  // ─── جلب بيانات الموظف (Edit mode) ───
  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    // نستخدم getEmployeeById لأنه يرجع EmployeeDto (فيه departmentId, phoneNumber, firstName...)
    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        // EmployeeProfileDto يحتوي: id, fullName, email, phone, departmentName, positionTitle, hireDate
        // EmployeeDto يحتوي: firstName, lastName, email, phoneNumber, hireDate, departmentId, positionId, userId
        // نجلب ما يتوفر:
        this.employeeForm.patchValue({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || '',
          lastName:  profile.lastName  || profile.fullName?.split(' ').slice(1).join(' ') || '',
          email:     profile.email     || '',
          phoneNumber: profile.phoneNumber || profile.phone || '',
          hireDate: profile.hireDate
            ? new Date(profile.hireDate).toISOString().split('T')[0]
            : '',
          departmentId: profile.departmentId || '',
          positionId:   profile.positionId   || '',
          userId: profile.userId || '',
        });

        // بناء linked user info للعرض في الـ template
        this.linkedUserInfo = {
          username: profile.fullName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Employee',
          email:    profile.email || '',
          role:     profile.positionTitle || profile.departmentName || 'Employee',
        };
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  // ─── جلب الأقسام ───
  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  // ─── جلب الـ users غير المرتبطين بموظف ───
  loadUnassignedUsers() {
    this.authService.getUnassignedEmployeeUsers().subscribe({
      next: (res: any) => {
        this.unassignedUsers = res?.items ?? (Array.isArray(res) ? res : []);
      },
      error: (err) => {
        console.error('Failed to load unassigned users:', err);
      },
    });
  }

  // ─── جلب المناصب حسب القسم ───
  loadPositions(deptId: number) {
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  // ─── الإيميل المعروض في الـ template ───
  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  // ─── إرسال الفورم ───
  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      Swal.fire(
        'بيانات ناقصة',
        'يرجى التأكد من تعبئة جميع الحقول المطلوبة',
        'warning',
      );
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId: Number(rawValues.positionId),
      hireDate: rawValues.hireDate
        ? new Date(rawValues.hireDate).toISOString()
        : new Date().toISOString(),
    };

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService
        .updateEmployee(this.currentEmployeeId, payload)
        .subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('نجاح', 'تم تعديل بيانات الموظف بنجاح', 'success');
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire('خطأ', err.error?.message || 'فشل التعديل', 'error');
          },
        });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('نجاح', 'تم إضافة الموظف بنجاح', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMsg =
            err.error?.message ||
            (err.error && typeof err.error === 'object'
              ? JSON.stringify(err.error)
              : 'فشل الإضافة');
          Swal.fire('خطأ', errorMsg, 'error');
          console.error('Full Error:', err);
        },
      });
    }
  }
}
