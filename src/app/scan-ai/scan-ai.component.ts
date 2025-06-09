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

  capturePhoto() {
    this.cameraInput.nativeElement.click();
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
