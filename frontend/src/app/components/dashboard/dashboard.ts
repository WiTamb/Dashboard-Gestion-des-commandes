import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  isLoading = true;

  // Pie Chart (Orders by Status)
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top', labels: { color: 'white' } } }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444'] }]
  };
  public pieChartType: ChartType = 'pie';

  // Bar Chart (Sales over time)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    },
    plugins: { legend: { labels: { color: 'white' } } }
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ventes (TND)', backgroundColor: '#6366f1' }]
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
      this.isLoading = false;
      this.setupCharts(data);
    });
  }

  setupCharts(data: any) {
    // Setup Pie Chart - Create new object for change detection
    this.pieChartData = {
      labels: data.ordersByStatus.map((s: any) => s._id),
      datasets: [{
        data: data.ordersByStatus.map((s: any) => s.count),
        backgroundColor: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444']
      }]
    };

    // Setup Bar Chart - Create new object for change detection
    this.barChartData = {
      labels: data.salesOverTime.map((s: any) => s._id),
      datasets: [{
        data: data.salesOverTime.map((s: any) => s.totalSales),
        label: 'Ventes (TND)',
        backgroundColor: '#6366f1'
      }]
    };
  }
}
