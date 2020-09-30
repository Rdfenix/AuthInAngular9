import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const authReq = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigateByUrl('/auth/login');
            }
          }

          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}
