import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
reasons = [
    {
      title: 'Nhanh nhẹn',
      desc: `Hệ thống AI của dự án hoạt động với tốc độ cao,
       giúp phân tích làn da và phát hiện mụn chỉ trong vài phút,
       người dùng có thể nhận diện và phân loại tình trạng da ngay lập tức. 
       Điều này giúp tiết kiệm thời gian và nâng cao hiệu quả trong việc chăm sóc da hằng ngày.`,
      icon: 'assets/images/timerIcon.webp' // plus icon for example
    },
    {
      title: 'Thông minh',
      desc: `Công nghệ trí tuệ nhân tạo (AI) được áp dụng để phân tích hình ảnh da một cách chính xác.
             Hệ thống sử dụng mô hình học sâu (Deep Learning) để nhận diện các loại mụn và đánh giá mức độ nghiêm trọng.
             Nhờ đó, người dùng có thể nhận được kết quả có độ chính xác cao, hỗ trợ họ đưa ra quyết định điều trị phù hợp nhất.`,
      icon: 'assets/images/ai-idea-4342841-3603768.webp' // circle icon placeholder
    },
    {
      title: 'Cá nhân hóa',
      desc: `Mỗi làn da đều có đặc điểm riêng, vì vậy hệ thống cung cấp các gợi ý điều trị cá nhân hóa dựa trên loại mụn và tình trạng da của từng người.
       Người dùng có thể theo dõi tiến trình cải thiện da qua thời gian và nhận được khuyến nghị sản phẩm,
        liệu trình chăm sóc phù hợp với nhu cầu cá nhân.`,
      icon: 'assets/images/persionalized.png' // menu icon placeholder
    },
    {
      title: 'Tiện lợi',
      desc: `Với nền tảng web thân thiện, hệ thống có thể được sử dụng trên mọi thiết bị như điện thoại,
       máy tính bảng và laptop mà không cần cài đặt phần mềm. Người dùng có thể kiểm tra làn da bất cứ lúc nào, dù đang ở nhà, văn phòng hay khi đi du lịch.
       Sự tiện lợi này giúp việc chăm sóc da trở nên dễ dàng và chủ động hơn bao giờ hết.`,
      icon: 'assets/images/responsiveIcon.png' // bookmark icon placeholder
    }
  ];
}
