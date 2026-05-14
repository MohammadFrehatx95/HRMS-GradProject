import { Component, inject, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface ChatMessage {
  text: string;
  isBot: boolean;
  time: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;
  
  private aiService = inject(AiService);
  
  messages: ChatMessage[] = [
    { text: 'مرحباً بك! أنا المساعد الذكي الخاص بنظام Kawadir. كيف يمكنني مساعدتك اليوم بخصوص مهام الموارد البشرية الخاصة بك؟', isBot: true, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' }) }
  ];
  
  userInput: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    const savedChat = sessionStorage.getItem('ai_chat_history');
    if (savedChat) {
      this.messages = JSON.parse(savedChat);
    }
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;
    
    const userText = this.userInput.trim();
    this.messages.push({
      text: userText,
      isBot: false,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' })
    });
    
    this.userInput = '';
    this.isLoading = true;
    this.saveChat();

    this.aiService.sendChatMessage(userText).subscribe(response => {
      this.messages.push({
        text: response,
        isBot: true,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' })
      });
      this.isLoading = false;
      this.saveChat();
    });
  }

  saveChat() {
    sessionStorage.setItem('ai_chat_history', JSON.stringify(this.messages));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
