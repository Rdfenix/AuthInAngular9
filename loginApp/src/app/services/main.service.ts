import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.url}/people`).pipe(
      tap((p) => console.log(p)),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url}/products`).pipe(
      tap((p) => console.log(p)),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}
