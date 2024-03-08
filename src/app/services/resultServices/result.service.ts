import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_results(data: any): Observable<any> {
    return this.http.post(`${this.URL}result/get_results`, data);
  }

  public add_result(data: any): Observable<any> {
    return this.http.post(`${this.URL}result/add_result`, data);
  }

  public get_report(data: any): Observable<any> {
    return this.http.post(`${this.URL}result/xxxx`, data);
  }
}
