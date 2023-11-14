import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_visits(data: any): Observable<any> {
    return this.http.post(`${this.URL}visits/get_visits`, data);
  }

  public add_visit(data: any): Observable<any> {
    return this.http.post(`${this.URL}visits/add_visit`, data);
  }

  public update_visit(data: any): Observable<any> {
    const url = `${this.URL}visits/update_visit`;
    return this.http.put(url, data);
  }

  public delete_visit(visit_id: any): Observable<any> {
    const url = `${this.URL}visits/delete_visit`;
    return this.http.put(url, visit_id);
  }
}
