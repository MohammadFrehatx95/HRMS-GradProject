import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-face-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face-capture.component.html',
  styleUrls: ['./face-capture.component.css']
})
export class FaceCaptureComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  @Output() imageCaptured = new EventEmitter<File>();
  
  stream: MediaStream | null = null;
  isCameraOpen = false;
  capturedImage: string | null = null;

  ngOnInit(): void {
  }

  async openCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.isCameraOpen = true;
      this.capturedImage = null;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      alert("Could not access the camera. Please allow permissions.");
    }
  }

  capture() {
    if (!this.isCameraOpen) return;
    
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/jpeg');
      
      // Convert DataURL to File
      fetch(this.capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "face_capture.jpg", { type: "image/jpeg" });
          this.imageCaptured.emit(file);
        });
        
      this.stopCamera();
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.isCameraOpen = false;
    }
  }

  retake() {
    this.capturedImage = null;
    this.openCamera();
  }
}
