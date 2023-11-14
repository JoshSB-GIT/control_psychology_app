import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_users(data: any): Observable<any> {
    return this.http.post(`${this.URL}users/get_users`, data);
  }

  public add_users(data: any): Observable<any> {
    return this.http.post(`${this.URL}users/add_user`, data);
  }

  public update_user(updatedUser: any): Observable<any> {
    const url = `${this.URL}users/update_user`;
    return this.http.put(url, updatedUser);
  }

  public delete_user(user_id: any): Observable<any> {
    const url = `${this.URL}users/delete_user`;
    return this.http.put(url, user_id);
  }
}
