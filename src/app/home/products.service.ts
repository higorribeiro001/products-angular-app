import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Products } from './Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl: string = environment.apiUrl + '/products/';

  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}?page=${page}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }

  deleteProduct(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}${id}/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }
}
