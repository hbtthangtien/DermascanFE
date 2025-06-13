import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  

  @Output() closed = new EventEmitter<void>();
  @Input() fullname: string | undefined;

  section: 'root' | 'settings' | 'language' = 'root';

  searchLang = '';
  languages = ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Trung', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Tây Ban Nha'];

  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    console.log(this.fullname);
  }

  selectLang(lang: string) {

  }

  logout() { this.auth.logout(); this.closed.emit(); }
  feedback() {
    console.log('feedback')
    this.router.navigate(['/feedback']);
    this.closed.emit();
  }
  profile() {
    this.router.navigate(['/profile']);
    this.closed.emit();
  }
}
