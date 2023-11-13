import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): boolean {
    if (username === 'busra' && password === '1') {
      
      this.isAuthenticated = true;
      return true; 
    }
    return false; 
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
