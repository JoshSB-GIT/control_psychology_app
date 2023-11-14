import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  private URL: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  public get_document_types(data: any): Observable<any> {
    return this.http.post(`${this.URL}/document_types/get_document_types`, data);
  }
}
