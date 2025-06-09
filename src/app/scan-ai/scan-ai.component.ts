import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScanAnalysisService } from '../services/scan-analysis.service';
import { NotificateService } from '../services/notificate.service';
import { ResponseAnalysis } from '../models/SkinAnalysis/response-analysis';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scan-ai',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './scan-ai.component.html',
  styleUrl: './scan-ai.component.css'
})
export class ScanAIComponent {
  private scanAnalysis = inject(ScanAnalysisService);
  private notificateService = inject(NotificateService);
  /**
  * 1 = guide, 2 = source choose, 3 = capture, 4 = loading, 5 = result, 6 = advice
  */
  step = 1;
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;
  selectedImageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null | undefined;
  analysis?: ResponseAnalysis['skinAnalysis'];
  boundingBoxes: ResponseAnalysis['inferenceResult']['predictions'] = [];
  videoStream?: MediaStream;
  @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  /** placeholders for demo */
  resultImage = 'assets/scan-demo-result.jpg';
  chartImage = 'assets/chart-placeholder.png';
  adviceText = `• Rửa mặt ngày 2 lần bằng sữa rửa mặt dịu nhẹ\n• Hạn chế chạm tay lên mặt\n• Sử dụng kem chống nắng SPF ≥ 30\n• Thêm vitamin A, E và kẽm trong chế độ ăn`;
  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageUrl = reader.result;

      this.processImage();
    };
    reader.readAsDataURL(this.selectedFile);
  }
  next() {
    this.scanAnalysis.ValidatePlanUser().subscribe({
      next: (resp) => {
        this.step = 2;
      },
      error: (err) => {
        console.log(err);
        this.notificateService.error("Gói dịch vụ của bạn không hợp lệ");
      }
    });
  }
  back() { this.step = Math.max(1, this.step - 1); }
  goCamera() {
    this.step = 3;
    this.cameraInput.nativeElement.click(); // mở camera
  }
  goUpload() {
    this.uploadInput.nativeElement.click();
  }

  private processImage() {
    if (!this.selectedFile) {
      this.notificateService.error('Vui lòng chọn ảnh.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.step = 4;
    console.log('progress');
    console.log(this.selectedFile);
    this.scanAnalysis.scanImage(formData).subscribe({
      next: (resp) => {

        this.analysis = resp.data.skinAnalysis;
        this.boundingBoxes = resp.data.inferenceResult.predictions;
        this.step = 5;
      },
      error: (err) => {
        this.notificateService.error("Hệ thống đang bảo trì, vui lòng hãy thử lại");
        this.step = 2;
      }
    });
  }

  async openCamera(): Promise<void> {
  this.step = 3;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 } }
    });
    this.videoStream = stream;
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.srcObject = stream;
      await this.videoRef.nativeElement.play();
    }
  } catch (err) {
    console.error(err);
    this.notificateService.error('Không thể truy cập camera.');
    this.step = 2;
  }
}

  stopCamera() {
    this.videoStream?.getTracks().forEach(t => t.stop());
    this.videoStream = undefined;
  }

  capturePhoto() {
    if (!this.videoRef?.nativeElement || !this.canvasRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (!blob) return;
      this.selectedFile = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
      this.selectedImageUrl = canvas.toDataURL('image/jpeg');
      this.stopCamera();
      this.processImage();
    }, 'image/jpeg', 0.92);
  }
  showAdvice() {
    this.step = 6;
  }

  exit() {
    this.step = 1;
    this.selectedFile = null;
    this.selectedImageUrl = null;
    this.analysis = undefined;
    this.boundingBoxes = [];
  }
}
