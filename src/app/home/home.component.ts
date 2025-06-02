import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
reasons = [
    {
      title: 'Nhanh nhẹn',
      desc: 'Kết quả trả về gần như tức thời, giúp bạn tiết kiệm thời gian đến spa/clinic.',
      icon: 'M12 4.5v15m7.5-7.5h-15' // plus icon for example
    },
    {
      title: 'Thông minh',
      desc: 'Mô hình học sâu được huấn luyện trên 50k+ ảnh da, độ chính xác > 92%.',
      icon: 'M12 2a10 10 0 100 20 10 10 0 000-20z' // circle icon placeholder
    },
    {
      title: 'Cá nhân hóa',
      desc: 'Đưa phác đồ, sản phẩm & lộ trình phù hợp loại da & mức độ mụn của riêng bạn.',
      icon: 'M4 6h16M4 12h16M4 18h16' // menu icon placeholder
    },
    {
      title: 'Tiện lợi',
      desc: 'Phân tích ngay trên điện thoại; không cần thiết bị chuyên dụng.',
      icon: 'M5 3v18l7-5 7 5V3' // bookmark icon placeholder
    }
  ];
}
