import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

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
}
