import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_history(data: any): Observable<any> {
    return this.http.post(`${this.URL}history/get_history`, data);
  }

  public add_history(data: any): Observable<any> {
    return this.http.post(`${this.URL}history/add_history`, data);
  }

  public get_report(data: any): Observable<any> {
    return this.http.post(`${this.URL}history/get_history_report`, data, {
      responseType: 'blob',
    });
  }
}
