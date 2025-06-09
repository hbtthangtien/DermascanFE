import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScanAnalysisService } from '../services/scan-analysis.service';

@Component({
  selector: 'app-scan-ai',
  imports: [CommonModule, RouterModule],
  templateUrl: './scan-ai.component.html',
  styleUrl: './scan-ai.component.css'
})
export class ScanAIComponent {
  private scanAnalysis = inject(ScanAnalysisService);
  /**
  * 1 = guide, 2 = source choose, 3 = capture, 4 = loading, 5 = result, 6 = advice
  */
  step = 1;
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;
  selectedImageUrl: string | ArrayBuffer | null = null;
  selectedFile!: File
  /** placeholders for demo */
  resultImage = 'assets/scan-demo-result.jpg';
  chartImage = 'assets/chart-placeholder.png';
  adviceText = `• Rửa mặt ngày 2 lần bằng sữa rửa mặt dịu nhẹ\n• Hạn chế chạm tay lên mặt\n• Sử dụng kem chống nắng SPF ≥ 30\n• Thêm vitamin A, E và kẽm trong chế độ ăn`;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      this.selectedFile = input.files[0];
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.step = 4;
    }
  }
  next() {
    this.scanAnalysis.ValidatePlanUser().subscribe({
      next: (resp) => {
        this.step = 2;
      },
      error: (err) => {
        console.log(err);
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
    //this.mockProcessing();
  }

  capturePhoto() {
    this.step = 4;
    this.processImage();
  }

  processImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    setTimeout(() => {
      this.step = 5; // show results
    }, 2500);
  }

  showAdvice() {
    this.step = 6;
  }

  exit() {
    this.step = 1; // reset flow; you could navigate away instead
  }
}
