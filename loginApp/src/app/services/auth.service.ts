import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  readonly url = environment.auth;
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private subLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials).pipe(
      tap((user: User) => {
        localStorage.setItem('token', user.token);
        this.subLoggedIn$.next(true);
        this.subjUser$.next(user);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.subLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
  
}
