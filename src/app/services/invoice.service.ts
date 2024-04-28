import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
      dataUrl = '../assets/db.json';
  constructor(private http: HttpClient) { }
  getInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.dataUrl);
  }

}
