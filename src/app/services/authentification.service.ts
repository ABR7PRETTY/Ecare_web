// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = `${environment.apiUrl}/api/auth/`;

  constructor(private http: HttpClient , private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}login`, credentials, { headers });
  }

  getUser():Observable<User>{
      return this.http.post<User>(`${this.apiUrl}me`, {})
    }

  TotalUsers():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}countUsers`);
  }

  saveToken(token: string){
    localStorage.setItem('authToken', token)
  }

  saveRole(role: string) {
    localStorage.setItem('role', role)
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }

}
