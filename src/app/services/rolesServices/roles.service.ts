import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_roles(data: any): Observable<any> {
    return this.http.post(`${this.URL}roles/get_roles`, data);
  }

  public add_rol(data: any): Observable<any> {
    return this.http.post(`${this.URL}roles/add_roles`, data);
  }

  public update_rol(data: any): Observable<any> {
    const url = `${this.URL}roles/update_rol`;
    return this.http.put(url, data);
  }

  public delete_rol(rol_id: any): Observable<any> {
    const url = `${this.URL}roles/delete_rol`;
    return this.http.put(url, rol_id);
  }
}
