import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/layout/sidebar/sidebar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  template: `
    <app-sidebar *ngIf="isAuth"></app-sidebar>
    <main [ngClass]="{'main-content': isAuth}">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppRoot implements OnInit {
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(status => {
      this.isAuth = status;
    });
  }
}
