import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FormProduct } from './FormProduct';

@Injectable({
  providedIn: 'root'
})
export class FormProductService {
  apiUrl: string = environment.apiUrl + '/products/';

  constructor(private http: HttpClient) { }

  getProduct(id: string): Observable<FormProduct> {
    return this.http.get<FormProduct>(`${this.apiUrl}${id}/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }

  postProduct(product: FormProduct): Observable<FormProduct> {
    return this.http.post<FormProduct>(this.apiUrl, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }

  putProduct(product: FormProduct): Observable<FormProduct> {
    return this.http.put<FormProduct>(`${this.apiUrl}${product?.id}/`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }
}
