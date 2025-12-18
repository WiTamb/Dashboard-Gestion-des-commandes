import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ArticleListComponent } from './components/articles/article-list/article-list';
import { ArticleFormComponent } from './components/articles/article-form/article-form';
import { OrderListComponent } from './components/orders/order-list/order-list';
import { OrderFormComponent } from './components/orders/order-form/order-form';
import { DeliveryListComponent } from './components/deliveries/delivery-list/delivery-list';
import { DeliveryFormComponent } from './components/deliveries/delivery-form/delivery-form';
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
        path: 'orders/new',
        component: OrderFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders/edit/:id',
        component: OrderFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries',
        component: DeliveryListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries/new',
        component: DeliveryFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries/edit/:id',
        component: DeliveryFormComponent,
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
