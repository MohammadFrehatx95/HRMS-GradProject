import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../core/services/salary.service';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  salaryList: any[] = [];
  isLoading: boolean = true;
  private salaryService = inject(SalaryService);

  ngOnInit() {
    this.loadSalaries();
  }

  loadSalaries() {
    this.salaryService.getSalaries().subscribe({
      next: (data) => {
        this.salaryList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching payroll records:', err);
        this.isLoading = false;
      },
    });
  }
}
