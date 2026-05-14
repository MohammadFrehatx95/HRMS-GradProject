import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiService } from '../../core/services/ai.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-ai-widget',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './ai-widget.component.html',
  styleUrls: ['./ai-widget.component.css']
})
export class AiWidgetComponent implements OnInit {
  /** Pass the current page name so the AI gives context-aware tips */
  @Input() page: 'dashboard' | 'employees' | 'leaves' | 'departments' | 'salary' | 'attendance' = 'dashboard';

  private aiService = inject(AiService);
  private authService = inject(AuthService);

  aiInsightText: string = 'جاري تحليل البيانات...';
  isLoadingAi: boolean = true;
  isAdmin: boolean = false;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin() || this.authService.isAdminOrHR();
    this.refreshAiInsight();
  }

  refreshAiInsight() {
    this.isLoadingAi = true;
    this.aiInsightText = 'جاري التحديث...';

    // Each page gets its own contextual endpoint
    const obs = this.isAdmin
      ? this.aiService.getPageInsight(this.page, 'admin')
      : this.aiService.getPageInsight(this.page, 'employee');

    obs.subscribe(text => {
      this.aiInsightText = text;
      this.isLoadingAi = false;
    });
  }
}
