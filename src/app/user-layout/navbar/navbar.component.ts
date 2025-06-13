import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserClaim } from '../../models/User/user-claim';
import { AuthService } from '../../services/auth.service';
import { ProfileMenuComponent } from "../profile-menu/profile-menu.component";
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, ProfileMenuComponent],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private router = inject(Router)
  navOpen = false;
  dropdownOpen = false;
  user$: Observable<UserClaim | null>;
  constructor(private authService: AuthService){
      this.user$ = this.authService.currentUser$;
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
