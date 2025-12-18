import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ArticleListComponent } from './components/articles/article-list/article-list';
import { ArticleFormComponent } from './components/articles/article-form/article-form';
import { OrderListComponent } from './components/orders/order-list/order-list';
import { DeliveryListComponent } from './components/deliveries/delivery-list/delivery-list';
import { authGuard } from './guards/auth';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articles',
        component: ArticleListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articles/new',
        component: ArticleFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articles/edit/:id',
        component: ArticleFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders',
        component: OrderListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries',
        component: DeliveryListComponent,
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
