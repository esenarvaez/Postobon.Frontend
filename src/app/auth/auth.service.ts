import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);

  constructor(private readonly router: Router) {
    this.isLoggedIn.set(!!localStorage.getItem('token'));
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', username);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  get currentUser(): string | null {
    return localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
