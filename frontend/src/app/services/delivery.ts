import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:5000/api/deliveries';

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
}
