import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-modal',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.css']
})
export class ImageCropperModalComponent {
  @Input() imageChangedEvent: any = '';
  @Input() aspectRatio: number = 1 / 1;
  @Input() maintainAspectRatio: boolean = true;
  @Input() showModal: boolean = false;
  @Input() title: string = 'Crop Image';

  @Output() imageCroppedEventOut = new EventEmitter<File>();
  @Output() closeModalEvent = new EventEmitter<void>();

  croppedImage: any = '';
  croppedBlob: Blob | null | undefined = null;
  isLoading = true;

  scale = 1;
  rotation = 0;
  transform: ImageTransform = {};

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl;
    this.croppedBlob = event.blob;
  }
  
  imageLoaded(image: LoadedImage) {
    this.isLoading = false;
  }
  
  cropperReady() {
    // cropper ready
  }
  
  loadImageFailed() {
    this.isLoading = false;
    alert('Failed to load image');
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = { ...this.transform, scale: this.scale };
  }
  
  zoomIn() {
    this.scale += .1;
    this.transform = { ...this.transform, scale: this.scale };
  }

  rotateLeft() {
    this.rotation--;
  }

  rotateRight() {
    this.rotation++;
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.transform = {};
  }

  onSave() {
    if (this.croppedBlob) {
      const file = new File([this.croppedBlob], 'cropped.png', { type: 'image/png' });
      this.imageCroppedEventOut.emit(file);
      this.resetImage();
    }
  }

  onCancel() {
    this.closeModalEvent.emit();
    this.resetImage();
  }
}

