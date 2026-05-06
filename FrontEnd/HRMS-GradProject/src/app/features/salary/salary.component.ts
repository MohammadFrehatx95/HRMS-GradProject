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
  private salaryService = inject(SalaryService);

  salaryRecords: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadSalaryData();
  }

  loadSalaryData() {
    this.isLoading = true;

    this.salaryService.getMyPayrolls().subscribe({
      next: (data) => {
        this.salaryRecords = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salary:', err);
        this.isLoading = false;
      },
    });
  }
}
