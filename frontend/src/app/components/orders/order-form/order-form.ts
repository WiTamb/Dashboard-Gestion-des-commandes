import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order';
import { ArticleService } from '../../../services/article';

@Component({
    selector: 'app-order-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './order-form.html',
    styleUrls: ['./order-form.css']
})
export class OrderFormComponent implements OnInit {
    editMode = false;
    orderId: string | null = null;
    isLoading = false;

    order: any = {
        customerName: '',
        items: [],
        total: 0,
        status: 'Pending'
    };

    articles: any[] = [];
    statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

    // For adding items
    selectedArticleId: string = '';
    selectedQuantity: number = 1;

    constructor(
        private orderService: OrderService,
        private articleService: ArticleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loadArticles();
        this.route.paramMap.subscribe(paramMap => {
            if (paramMap.has('id')) {
                this.editMode = true;
                this.orderId = paramMap.get('id');
                this.isLoading = true;
                this.orderService.getOrder(this.orderId!).subscribe(data => {
                    this.order = data;
                    this.isLoading = false;
                });
            }
        });
    }

    loadArticles() {
        this.articleService.getArticles().subscribe(data => {
            this.articles = data;
        });
    }

    addItem() {
        if (!this.selectedArticleId || this.selectedQuantity < 1) return;

        const article = this.articles.find(a => a._id === this.selectedArticleId);
        if (!article) return;

        // Check if already in list
        const existingItem = this.order.items.find((i: any) => i.articleId === this.selectedArticleId);
        if (existingItem) {
            existingItem.quantity += this.selectedQuantity;
        } else {
            this.order.items.push({
                articleId: this.selectedArticleId,
                name: article.name,
                price: article.price,
                quantity: this.selectedQuantity
            });
        }

        this.calculateTotal();
        this.selectedArticleId = '';
        this.selectedQuantity = 1;
    }

    removeItem(index: number) {
        this.order.items.splice(index, 1);
        this.calculateTotal();
    }

    calculateTotal() {
        this.order.total = this.order.items.reduce((sum: number, item: any) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    onSaveOrder(form: any) {
        if (form.invalid || this.order.items.length === 0) {
            alert('Veuillez remplir tous les champs et ajouter au moins un article.');
            return;
        }

        this.isLoading = true;
        if (this.editMode) {
            this.orderService.updateOrder(this.orderId!, this.order).subscribe({
                next: () => this.router.navigate(['/orders']),
                error: (err) => {
                    console.error('Error updating order:', err);
                    alert('Erreur lors de la mise à jour');
                    this.isLoading = false;
                }
            });
        } else {
            this.orderService.createOrder(this.order).subscribe({
                next: () => this.router.navigate(['/orders']),
                error: (err) => {
                    console.error('Error creating order:', err);
                    alert('Erreur lors de la création');
                    this.isLoading = false;
                }
            });
        }
    }
}
