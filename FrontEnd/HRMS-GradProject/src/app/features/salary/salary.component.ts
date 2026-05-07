import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../core/services/salary.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private authService = inject(AuthService);

  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadSalaries();
  }

  loadSalaries() {
    this.isLoading = true;

    const request = this.isAdmin
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.salariesList = Array.isArray(extractedData) ? extractedData : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }
}
