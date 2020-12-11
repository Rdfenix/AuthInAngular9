import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    const token = localStorage.getItem('token');
    if (token && !this.subLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`).pipe(
      tap((user: User) => {
        if (user) {
          this.subLoggedIn$.next(true);
          this.subjUser$.next(user);
        }
      }),
      map((user: User) => (user ? true : false)),
      catchError((error) => {
        this.logout();
        return of(false);
      })
    );
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.subLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
