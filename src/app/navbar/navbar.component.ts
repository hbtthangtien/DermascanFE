import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private router = inject(Router)
  onRegister() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  navOpen = false;
}
