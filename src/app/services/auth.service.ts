import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { LoginRequest } from '../models/Auth/login-request';
import { TokenResponse } from '../models/Auth/token-response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseResponse } from '../models/common/base-response';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserClaim } from '../models/User/user-claim';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = 'auth/login';
  private baseService = inject(BaseService);
  private baseUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<UserClaim | null>(null);
  currentUser$: Observable<UserClaim | null> = this.userSubject.asObservable();
  constructor(private router: Router, private http: HttpClient) {
    this.restoreUser();
  }
  login(body: LoginRequest): Observable<BaseResponse<TokenResponse>> {
    return this.baseService.post<BaseResponse<TokenResponse>>(this.loginPath, body)
      .pipe(
        tap(resp => {
          if (resp.success) {
            localStorage.setItem('authToken', JSON.stringify(resp.data));
            const user = this.getUser();
            this.userSubject.next(user);
            const role = this.getRole();
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        })
      );
  }
  logout() {
    const token = this.getToken();
    localStorage.removeItem('authToken');
    const body = {
      refreshToken: token?.refreshToken
    }
    console.log('logout');
    return this.http.delete<any>(`${this.baseUrl}/auth/revoke-token`, { body }).subscribe({
      next: (resp) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        this.restoreUser();
      },
      error: (err) => {

      }
    });

  }
  getUser() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode<UserClaim>(token);
      decoded.Image = "assets/images/ImageUser.jpg"
      //console.log(decoded);
      return decoded;
    }
    return null;
  }
  restoreUser() {
    const storedUser = localStorage.getItem('authToken');
    if (storedUser) {
      var decoded = this.getUser();
      this.userSubject.next(decoded);
    } else {
      this.userSubject.next(null);
    }
  }
  refreshToken(): Observable<BaseResponse<TokenResponse>> {
    const token = this.getToken();
    return this.http.post<BaseResponse<TokenResponse>>(`${this.baseUrl}/auth/refresh-token`, { refreshToken: token?.refreshToken });
  }
  getToken() {
    const tokenJson = localStorage.getItem('authToken');
    const token = tokenJson ? JSON.parse(tokenJson) as TokenResponse : null;
    return token;
  }
  getRole() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode<UserClaim>(token);

      //console.log(decoded);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return null;
  }
}
