import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_citations(data: any): Observable<any> {
    return this.http.post(`${this.URL}citations/get_citations`, data);
  }

  public add_citation(data: any): Observable<any> {
    return this.http.post(`${this.URL}citations/add_citation`, data);
  }

  public update_citation(data: any): Observable<any> {
    const url = `${this.URL}citations/update_citation`;
    return this.http.put(url, data);
  }

  public delete_citation(citation_id: any): Observable<any> {
    const url = `${this.URL}citations/delete_citation`;
    return this.http.put(url, citation_id);
  }
}
