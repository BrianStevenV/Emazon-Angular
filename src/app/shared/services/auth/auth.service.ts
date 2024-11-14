import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, TokenPayload, TokenResponse } from '../../models/login.model';
import { LOCAL_STORAGE_TOKEN_AUTH_NAME, NAVIGATE_LOG_OUT_PATH } from '../../constants/auth/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = `${environment.user_base_path}${environment.auth_controller}${environment.auth_post_login}`;
  private role!: string | null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  logIn(login: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}`, login).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, response.token);
          this.role = this.decodeToken(response.token).roles;
        }
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  logOut(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
    this.role = null;
    this.router.navigate([NAVIGATE_LOG_OUT_PATH]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
  }

  getRole(): string | null {
    if(!this.role) {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
      if(token) {
        this.role = this.decodeToken(token).roles;
      }
    }
    console.log(this.role && this.role.length> 0 ? this.role[0] : null);
    return this.role && this.role.length> 0 ? this.role[0] : null;
  }

  
  private decodeToken(token: string): TokenPayload {
    const payloadToken = token.split('.')[1];
    return JSON.parse(atob(payloadToken));
  }

  
}
