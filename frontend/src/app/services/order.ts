import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrder(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  createOrder(orderData: any) {
    return this.http.post(this.apiUrl, orderData);
  }

  updateOrder(id: string, orderData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, orderData);
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
