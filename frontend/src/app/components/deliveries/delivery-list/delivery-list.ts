import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeliveryService } from '../../../services/delivery';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delivery-list.html',
  styleUrls: ['./delivery-list.css']
})
export class DeliveryListComponent implements OnInit {
  deliveries: any[] = [];
  isLoading = true;
  statusOptions = ['Preparing', 'In Progress', 'Delivered'];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.deliveryService.getDeliveries().subscribe(data => {
      this.deliveries = data;
      this.isLoading = false;
    });
  }

  onStatusChange(id: string, event: any) {
    const newStatus = event.target.value;
    this.deliveryService.updateDeliveryStatus(id, newStatus).subscribe(() => {
      this.loadDeliveries();
    });
  }

  onDelete(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette livraison ?')) {
      this.deliveryService.deleteDelivery(id).subscribe(() => {
        this.loadDeliveries();
      });
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Preparing': return 'bg-info';
      case 'In Progress': return 'bg-primary';
      case 'Delivered': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}
