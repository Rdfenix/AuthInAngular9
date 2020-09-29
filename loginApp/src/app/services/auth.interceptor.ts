import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
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
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
