import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeliveryService } from '../../../services/delivery';
import { OrderService } from '../../../services/order';

@Component({
    selector: 'app-delivery-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './delivery-form.html',
    styleUrls: ['./delivery-form.css']
})
export class DeliveryFormComponent implements OnInit {
    editMode = false;
    deliveryId: string | null = null;
    isLoading = false;

    delivery: any = {
        orderId: '',
        address: '',
        date: '',
        status: 'Preparing'
    };

    orders: any[] = [];
    statusOptions = ['Preparing', 'In Progress', 'Delivered'];

    constructor(
        private deliveryService: DeliveryService,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loadOrders();
        this.route.paramMap.subscribe(paramMap => {
            if (paramMap.has('id')) {
                this.editMode = true;
                this.deliveryId = paramMap.get('id');
                this.isLoading = true;
                this.deliveryService.getDelivery(this.deliveryId!).subscribe(data => {
                    this.delivery = {
                        orderId: data.orderId?._id || data.orderId,
                        address: data.address,
                        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
                        status: data.status
                    };
                    this.isLoading = false;
                });
            }
        });
    }

    loadOrders() {
        this.orderService.getOrders().subscribe(data => {
            this.orders = data;
        });
    }

    onSaveDelivery(form: any) {
        if (form.invalid) return;

        this.isLoading = true;
        if (this.editMode) {
            this.deliveryService.updateDelivery(this.deliveryId!, this.delivery).subscribe({
                next: () => this.router.navigate(['/deliveries']),
                error: (err) => {
                    console.error('Error updating delivery:', err);
                    alert('Erreur lors de la mise à jour');
                    this.isLoading = false;
                }
            });
        } else {
            this.deliveryService.createDelivery(this.delivery).subscribe({
                next: () => this.router.navigate(['/deliveries']),
                error: (err) => {
                    console.error('Error creating delivery:', err);
                    alert('Erreur lors de la création');
                    this.isLoading = false;
                }
            });
        }
    }
}
