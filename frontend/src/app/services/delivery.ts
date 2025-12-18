import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = `${environment.apiUrl}/deliveries`;

  constructor(private http: HttpClient) { }

  getDeliveries() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createDelivery(deliveryData: any) {
    return this.http.post(this.apiUrl, deliveryData);
  }

  updateDeliveryStatus(id: string, status: string) {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  getDelivery(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateDelivery(id: string, deliveryData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, deliveryData);
  }

  deleteDelivery(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
