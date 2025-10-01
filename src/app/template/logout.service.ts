import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  apiUrl: string = environment.apiUrl + '/users/logout/';

  constructor(private http: HttpClient) { }

  logout(): Observable<Object> {
    return this.http.post(this.apiUrl, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }),
      withCredentials: true
    });
  }
}
