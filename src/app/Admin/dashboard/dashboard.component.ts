import { Component, inject, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardService } from '../../services/admin/dashboard.service';
import { Statistic } from '../../models/admin/dashboard/statistic';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import dayjs from 'dayjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private svc = inject(DashboardService);
  public dashboard: Statistic | undefined;
  /* ───── Pie: tỷ lệ gói ───── */
  pieType: 'pie' = 'pie';
  pieData: ChartData<'pie', number[], string> = { labels: [], datasets: [] };
  pieOptions: ChartOptions<'pie'> = { responsive: true, plugins: { legend: { position: 'right' } } };

  /* ───── Bar 1: đăng ký + doanh thu theo tháng ───── */
  monthlyType: 'bar' = 'bar';
  monthlyData: ChartData<'bar'> = { labels: [], datasets: [] };
  monthlyOpts: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: { position: 'left', title: { text: 'Đăng ký', display: true } },
      y1: { position: 'right', grid: { drawOnChartArea: false }, title: { text: 'Doanh thu (k)', display: true } }
    }
  };

  /* ───── Bar 2: doanh thu theo gói ───── */
  planType: 'bar' = 'bar';
  planData: ChartData<'bar'> = { labels: [], datasets: [] };
  planOpts: ChartOptions<'bar'> = { responsive: true, plugins: { legend: { position: 'bottom' } } };

  ngOnInit(): void {
    this.svc.getDashboard().subscribe(stat => {
      this.buildPie(stat.piePlan);
      this.buildMonthly(stat.monthlyStats);
      this.buildPlanRevenue(stat.planRevenues);
      this.dashboard = stat;
    });
  }

  /* ---------- helpers ---------- */
  private buildPie(src: Statistic['piePlan']) {
    this.pieData = {
      labels: src.map(x => x.planName),
      datasets: [{ data: src.map(x => x.userCount) }]
    };
  }

  private buildMonthly(src: Statistic['monthlyStats']) {
    this.monthlyData = {
      labels: src.map(x => dayjs(x.month).format('MM/YY')),
      datasets: [
        { data: src.map(x => x.registerCount), label: 'Đăng ký', yAxisID: 'y' },
        { data: src.map(x => x.revenue / 1000), label: 'Doanh thu (k)', yAxisID: 'y1' }
      ]
    };
  }

  private buildPlanRevenue(src: Statistic['planRevenues']) {
    this.planData = {
      labels: src.map(x => x.planName),
      datasets: [
        { data: src.map(x => x.registerCount), label: 'Đăng ký' },
        { data: src.map(x => x.revenue), label: 'Doanh thu', type: 'bar' }
      ]
    };
  }
}
