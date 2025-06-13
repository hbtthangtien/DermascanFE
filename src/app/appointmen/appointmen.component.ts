import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Doctor } from '../models/Doctors/doctor';

@Component({
  selector: 'app-appointmen',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointmen.component.html',
  styleUrl: './appointmen.component.css'
})
export class AppointmenComponent {
   doctors: Doctor[] = [
    {
      name: 'BS. Trần Thanh Hà',
      speciality: 'Da liễu - Thẩm mỹ',
      avatar: 'assets/images/doctor1.avif'
    },
    {
      name: 'BS. Nguyễn Đức Minh',
      speciality: 'Tư vấn tổng quát',
      avatar: 'assets/images/doctor2.jpg'
    },
    {
      name: 'BS. Lê Thu Phương',
      speciality: 'Dinh dưỡng - Sức khỏe nữ',
      avatar: 'assets/images/doctor3.jpg'
    }
  ];

  // Các khung giờ có sẵn
  timeSlots: string[] = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  // Biến lưu form + trạng thái
  selectedDoctor: Doctor | null = null;
  fullname: string = '';
  phone: string = '';
  date: string = '';
  time: string = '';
  note: string = '';

  showDialog: boolean = false;
  success: boolean = false;

  // Chọn bác sĩ
  selectDoctor(doc: Doctor) {
    this.selectedDoctor = doc;
  }

  // Submit form: show dialog xác nhận
  submitAppointment() {
    if (!this.selectedDoctor || !this.fullname || !this.phone || !this.date || !this.time) {
      alert('Vui lòng nhập đầy đủ thông tin & chọn bác sĩ!');
      return;
    }
    this.showDialog = true;
  }

  // Xác nhận đặt lịch trong dialog
  confirmAppointment() {
    // TODO: Gửi API/ghi database ở đây nếu cần
    // Ví dụ: this.appointmentService.book({...}).subscribe()
    this.showDialog = false;
    this.success = true;

    // Reset form sau khi đặt (nếu muốn)
    setTimeout(() => {
      this.success = false;
      this.selectedDoctor = null;
      this.fullname = '';
      this.phone = '';
      this.date = '';
      this.time = '';
      this.note = '';
    }, 4000); // Dialog thành công tự tắt sau 4s
  }
}
