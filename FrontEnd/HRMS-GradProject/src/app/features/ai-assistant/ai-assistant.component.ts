import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, AiResponseDto } from '../../core/services/ai.service';
import { AuthService } from '../../core/services/auth.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  loading?: boolean;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css'],
})
export class AiAssistantComponent implements OnInit, AfterViewChecked {
  private aiService = inject(AiService);
  private authService = inject(AuthService);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  cooldown: boolean = false;
  cooldownSeconds: number = 0;
  totalTokensUsed: number = 0;
  isAdminOrHR: boolean = false;

  readonly MAX_CHARS = 250;
  readonly COOLDOWN_DURATION = 4; // seconds

  quickActions = [
    {
      label: '📊 Analyze My Leaves',
      icon: 'bi-bar-chart-line',
      action: 'analyze-leave',
    },
    {
      label: '💰 Salary Insights',
      icon: 'bi-graph-up-arrow',
      action: 'salary-insight',
    },
    {
      label: '📋 Leave Policy',
      icon: 'bi-journal-text',
      action: 'chat',
      prompt: 'What is the company leave policy?',
    },
    {
      label: '🕐 How to Clock In',
      icon: 'bi-clock',
      action: 'chat',
      prompt: 'How do I clock in and out for attendance?',
    },
  ];

  ngOnInit(): void {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadChat();

    // Greeting if no chat history
    if (this.messages.length === 0) {
      this.messages.push({
        role: 'assistant',
        content: "👋 **Hello! I'm HRMS-AI**. How can I help you today?",
        timestamp: new Date(),
      });
      this.saveChat();
    }
  }

  private saveChat(): void {
    localStorage.setItem('hrms_ai_chat', JSON.stringify(this.messages));
    localStorage.setItem('hrms_ai_tokens', this.totalTokensUsed.toString());
  }

  private loadChat(): void {
    const saved = localStorage.getItem('hrms_ai_chat');
    const tokens = localStorage.getItem('hrms_ai_tokens');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
      } catch (e) {
        this.messages = [];
      }
    }
    if (tokens) {
      this.totalTokensUsed = parseInt(tokens, 10) || 0;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  get charCount(): number {
    return this.userInput.length;
  }

  get canSend(): boolean {
    return (
      this.userInput.trim().length > 0 &&
      this.userInput.length <= this.MAX_CHARS &&
      !this.isLoading &&
      !this.cooldown
    );
  }

  sendMessage(): void {
    if (!this.canSend) return;
    const text = this.userInput.trim();
    this.userInput = '';
    this.addUserMessage(text);
    this.callChat(text);
  }

  triggerQuickAction(action: any): void {
    if (this.isLoading || this.cooldown) return;

    if (action.action === 'analyze-leave') {
      this.addUserMessage('📊 Analyze my leave history');
      this.addLoadingMessage();
      this.aiService.analyzeLeave().subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.handleError(err),
      });
    } else if (action.action === 'salary-insight') {
      this.addUserMessage('💰 Give me salary insights');
      this.addLoadingMessage();
      this.aiService.salaryInsight().subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.handleError(err),
      });
    } else if (action.action === 'chat' && action.prompt) {
      this.addUserMessage(action.prompt);
      this.callChat(action.prompt);
    }
  }

  private callChat(text: string): void {
    this.addLoadingMessage();
    this.aiService.chat(text).subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err),
    });
  }

  private addUserMessage(text: string): void {
    this.messages.push({ role: 'user', content: text, timestamp: new Date() });
    this.isLoading = true;
    this.saveChat();
  }

  private addLoadingMessage(): void {
    this.messages.push({
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true,
    });
  }

  private handleResponse(res: AiResponseDto): void {
    const idx = this.findLastLoadingIndex();
    if (idx !== -1) {
      this.messages[idx] = {
        role: 'assistant',
        content: res.reply,
        timestamp: new Date(),
        tokens: res.tokens,
        loading: false,
      };
    }
    this.totalTokensUsed += res.tokens || 0;
    this.isLoading = false;
    this.saveChat();
    this.startCooldown();
  }

  private handleError(err: any): void {
    const idx = this.findLastLoadingIndex();
    let errMsg = 'Something went wrong. Please try again.';

    if (err?.error?.message) {
      const rawMessage = err.error.message as string;
      
      if (rawMessage.includes('Invalid API Key') || rawMessage.includes('invalid_api_key')) {
        errMsg = 'The AI service is not properly configured (Invalid API Key). Please contact the system administrator.';
      } else if (rawMessage.includes('rate_limit_exceeded')) {
        errMsg = 'The AI service is currently busy (Rate Limit Exceeded). Please try again later.';
      } else if (rawMessage.includes('insufficient_quota')) {
        errMsg = 'The AI service quota has been exceeded. Please contact the system administrator.';
      } else if (rawMessage.includes('Groq API error')) {
         try {
           const jsonStart = rawMessage.indexOf('{');
           if (jsonStart !== -1) {
             const jsonPart = rawMessage.substring(jsonStart);
             const parsed = JSON.parse(jsonPart);
             if (parsed?.error?.message) {
               errMsg = `AI Error: ${parsed.error.message}`;
             } else {
               errMsg = 'The AI service encountered an error processing your request.';
             }
           } else {
             errMsg = 'The AI service encountered a connection error. Please try again.';
           }
         } catch(e) {
           errMsg = 'The AI service encountered an unexpected error. Please try again later.';
         }
      } else {
        errMsg = rawMessage;
      }
    } else if (err?.error?.title) {
      errMsg = err.error.title;
    }

    if (idx !== -1) {
      this.messages[idx] = {
        role: 'assistant',
        content: `❌ **Error:** ${errMsg}`,
        timestamp: new Date(),
        loading: false,
      };
    }
    this.isLoading = false;
    this.saveChat();
    this.startCooldown();
  }

  private findLastLoadingIndex(): number {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      if (this.messages[i].loading) return i;
    }
    return -1;
  }


  private startCooldown(): void {
    this.cooldown = true;
    this.cooldownSeconds = this.COOLDOWN_DURATION;
    const interval = setInterval(() => {
      this.cooldownSeconds--;
      if (this.cooldownSeconds <= 0) {
        this.cooldown = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  formatContent(content: string): string {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.+)/gm, '<span class="bullet">• $1</span>')
      .replace(/^\d+\. (.+)/gm, '<span class="numbered">$&</span>')
      .replace(/\n/g, '<br>');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.messages = [];
    this.totalTokensUsed = 0;
    localStorage.removeItem('hrms_ai_chat');
    localStorage.removeItem('hrms_ai_tokens');
    this.ngOnInit();
  }
}
