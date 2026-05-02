import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  // 1. تعريف هيكل النموذج وشروط التحقق
  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    status: new FormControl('Active'), // قيمة افتراضية
  });

  // 2. دالة تُنفذ عند الضغط على زر الحفظ
  onSubmit() {
    if (this.employeeForm.valid) {
      // طباعة البيانات في وحدة التحكم مؤقتاً للتأكد من عملها
      console.log('Form Data:', this.employeeForm.value);
    }
  }
}
