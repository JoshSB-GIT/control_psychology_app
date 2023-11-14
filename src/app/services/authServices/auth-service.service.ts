import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private URL: String = 'http://localhost:5000/';
  private ACCESTOKEN: string = '';

  constructor(private http: HttpClient) {
    this.ACCESTOKEN = localStorage.getItem('authToken');
  }

  public login(data: any): Observable<any> {
    return this.http.post(`${this.URL}auth/login`, data);
  }

  public logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESTOKEN}`,
    });

    return this.http.get(`${this.URL}auth/logout`, { headers });
  }
}
