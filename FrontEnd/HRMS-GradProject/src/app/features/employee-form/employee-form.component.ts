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

  // بيانات اليوزر اللي مربوط بالموظف في حالة التعديل
  linkedUserInfo: { username: string; email: string; role: string } | null = null;

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
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
      // edit mode
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      // userId والإيميل ما يتعدلوا
      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {
      // add mode
      // لو جاية داتا من صفحة ثانية نعبيها مباشرة
      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }
      // الإيميل يتعبى تلقائياً من اليوزر المختار
      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      // نعبي الإيميل لما يختار يوزر من الـ dropdown
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

  // جلب بيانات الموظف
  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    // بنجيب كامل التفاصيل
    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        // نعبي الفورم بالداتا الموجودة
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

        // معلومات بسيطة للعرض في الـ header
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

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  // اليوزرات اللي ما ربطوا بموظف بعد
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

  // positions حسب القسم
  loadPositions(deptId: number) {
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  // الإيميل disabled فنحتاج getRawValue
  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  // تحويل أخطاء الـ backend لرسائل مفهومة
  private parseBackendError(err: any): string {
    const body = err?.error;

    if (!body) return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';

    // ASP.NET validation errors — كل field فيه list من الـ errors
    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'رقم الهاتف',
        FirstName:   'الاسم الأول',
        LastName:    'اسم العائلة',
        Email:       'البريد الإلكتروني',
        HireDate:    'تاريخ التعيين',
        DepartmentId:'القسم',
        PositionId:  'المسمى الوظيفي',
        UserId:      'حساب المستخدم',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs  = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          // نترجم الرسالة للعربي لو عندنا ترجمة
          const translated = this.translateBackendMsg(String(msg));
          messages.push(`• ${label}: ${translated}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    // رسالة عادية
    if (body.message) return body.message;
    if (body.title)   return body.title;
    if (typeof body === 'string') return body;

    return 'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.';
  }

  // ترجمة بعض رسائل الـ backend الشائعة للعربي
  private translateBackendMsg(msg: string): string {
    const map: Record<string, string> = {
      'Invalid phone number format.':         'صيغة رقم الهاتف غير صحيحة (يجب أن يكون 10 أرقام)',
      'Phone number must be 10 digits.':      'يجب أن يكون رقم الهاتف 10 أرقام بالضبط',
      'The field PhoneNumber must be a string or array type with a maximum length of 10.': 'رقم الهاتف يجب ألا يتجاوز 10 أرقام',
      'is required.':                         'هذا الحقل مطلوب',
      'already exists':                       'هذا السجل موجود مسبقاً',
    };
    for (const [en, ar] of Object.entries(map)) {
      if (msg.toLowerCase().includes(en.toLowerCase())) return ar;
    }
    return msg;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      // خطأ رقم الهاتف له رسالة مخصصة
      const phone = this.employeeForm.get('phoneNumber');
      if (phone?.errors?.['pattern']) {
        Swal.fire({
          icon: 'warning',
          title: 'رقم هاتف غير صحيح',
          text: 'رقم الهاتف يجب أن يتكون من 10 أرقام فقط (أرقام فقط بدون مسافات أو رموز)',
          confirmButtonText: 'حسناً',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'بيانات ناقصة',
        text: 'يرجى التأكد من تعبئة جميع الحقول المطلوبة بشكل صحيح',
        confirmButtonText: 'حسناً',
      });
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId:   Number(rawValues.positionId),
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
            const msg = this.parseBackendError(err);
            Swal.fire({ icon: 'error', title: 'فشل التعديل', text: msg, confirmButtonText: 'حسناً' });
            console.error('Update error:', err);
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
          const msg = this.parseBackendError(err);
          Swal.fire({ icon: 'error', title: 'فشل الإضافة', text: msg, confirmButtonText: 'حسناً' });
          console.error('Add error:', err);
        },
      });
    }
  }
}
