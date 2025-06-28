import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import dayjs from 'dayjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { SkinAnalysisHistoryService } from '../../services/skin-analysis-history.service';
import { SkinAnalysisHistory } from '../../models/SkinAnalysis/History/skin-analysis-history';
import { ZoneScore } from '../../models/SkinAnalysis/History/zone-score';
import { SkinAnalysisStatistic } from '../../models/SkinAnalysis/History/skin-analysis-statistic';
import { Observable } from 'rxjs';
import { UserClaim } from '../../models/User/user-claim';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-skin-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
  templateUrl: './skin-history.component.html',
  styleUrls: ['./skin-history.component.css']
})
export class SkinHistoryComponent implements OnInit {

  // ======= state =======
  private svc = inject(SkinAnalysisHistoryService);
  @ViewChild(BaseChartDirective) lineChart?: BaseChartDirective;
  private userId: number = 0;
  private currentUser$: Observable<UserClaim | null>;
  private authService = inject(AuthService);
  history: SkinAnalysisHistory[] = [];
  zoneScores: ZoneScore[] = [];
  statistic: SkinAnalysisStatistic | undefined;

  constructor() {
    this.currentUser$ = this.authService.currentUser$;
    this.currentUser$.subscribe({
      next: (u) => {
        this.userId = u!.UserId;
      }
    });
  }

  //range = new FormControl<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  // ======= chart configs (khởi tạo rỗng) =======
  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: { y: { suggestedMin: 0, suggestedMax: 100 } },
    plugins: { legend: { position: 'bottom' } }
  };
  range = new FormGroup({
    from: new FormControl<Date | null>(null),
    to: new FormControl<Date | null>(null)
  });

  radarChartType: ChartType = 'radar';
  radarChartData: ChartData<'radar'> = { labels: [], datasets: [] };
  radarChartOptions: ChartOptions<'radar'> = { responsive: true };

  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartOptions<'bar'> = { responsive: true, indexAxis: 'x' };

  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  periodControl = new FormControl<'week' | 'month'>('week');

  // ======= life-cycle =======
  ngOnInit(): void {
    // lần đầu load 30 ngày gần nhất
    const today = dayjs();
    this.range.setValue({ from: today.subtract(30, 'day').toDate(), to: today.toDate() }, { emitEvent: false });
    this.fetchAndRender();

    // lắng nghe người dùng đổi range
    this.range.valueChanges
      .pipe(debounceTime(300), switchMap(v => {
        // Ép kiểu lại nếu là string
        let from = v?.from;
        let to = v?.to;
        if (from && typeof from === 'string') from = new Date(from);
        if (to && typeof to === 'string') to = new Date(to);
        return this.getHistory(from, to);
      }))
      .subscribe(h => this.updateCharts(h));

    this.periodControl.valueChanges.subscribe(period => {
      console.log('Period changed:', period);
      this.updateZoneBarChart(period!);
    });
    this.updateZoneBarChart(this.periodControl.value!);
  }

  // ======= helpers =======
  private getHistory(from?: Date | null, to?: Date | null) {
    return this.svc.getHistory(this.userId, from ?? undefined, to ?? undefined);
  }
  private getZoneScore(period?: string | 'week') {
    return this.svc.getZoneScore(this.userId, period);
  }
  public fetchAndRender() {
    let { from, to } = this.range.value!;
    if (from && typeof from === 'string') from = new Date(from);
    if (to && typeof to === 'string') to = new Date(to);
    this.getHistory(from!, to!).subscribe(h => this.updateCharts(h));
    this.updateZoneBarChart(this.periodControl.value!);
  }
  private updateZoneBarChart(period: 'week' | 'month') {
    // Gọi API lấy zone score
    this.getZoneScore(period).subscribe(scores => {
      // Lọc các vùng cần hiển thị, hoặc dùng toàn bộ nếu muốn
      const filtered = scores.filter(z => z.zoneName && z.score !== undefined);
      this.zoneScores = filtered;
      this.barChartData = {
        labels: filtered.map(z => z.zoneName),
        datasets: [
          {
            data: filtered.map(z => z.score),
            label: 'Điểm',
            backgroundColor: 'rgba(209,61,118,0.2)', // màu nhẹ
            borderColor: 'rgba(209,61,118,0.8)',
            borderWidth: 1
          }
        ]
      };
    });
  }

  private updateCharts(hist: SkinAnalysisHistory[]): void {
    this.history = hist;

    /* ---- Build Line ---- */
    const labels = hist.map(h => dayjs(h.capturedAt).format('D/M'));
    this.lineChartData = {
      labels,
      datasets: [
        { data: hist.map(h => h.overallScore), label: 'Tổng quan', tension: .4, hidden: false },
        { data: hist.map(h => h.acneScore), label: 'Mụn', tension: .4, hidden: false },
        { data: hist.map(h => h.moistureScore), label: 'Độ ẩm', tension: .4, hidden: false },
        { data: hist.map(h => h.agingScore), label: 'Lão hóa', tension: .4, hidden: true },
        { data: hist.map(h => h.pigmentationScore), label: 'Sắc tố', tension: .4, hidden: true },
        { data: hist.map(h => h.poreScore), label: 'Lỗ chân lông', tension: .4, hidden: true },
        { data: hist.map(h => h.wrinkleScore), label: 'Nếp nhăn', tension: .4, hidden: true },
        { data: hist.map(h => h.sensitivityScore), label: 'Độ nhạy cảm', tension: .4, hidden: true }
      ]
    };

    /* ---- Radar ---- (so sánh tuần) */
    const latest = hist.slice(-7);
    const prev = hist.slice(-14, -7);
    const avg = (arr: number[]) => arr.reduce((s, n) => s + n, 0) / arr.length || 0;
    this.radarChartData = {
      labels: ['Độ ẩm', 'Lão hóa', 'Nhạy cảm', 'Tổng thể', 'Mụn', 'Lỗ chân lông', 'Nếp nhăn', 'Sắc tố'],
      datasets: [
        {
          data: [
            avg(latest.map(x => x.moistureScore)),
            avg(latest.map(x => x.agingScore)),
            avg(latest.map(x => x.sensitivityScore)),
            avg(latest.map(x => x.overallScore)),
            avg(latest.map(x => x.acneScore)),
            avg(latest.map(x => x.poreScore)),
            avg(latest.map(x => x.wrinkleScore)),
            avg(latest.map(x => x.pigmentationScore))

          ],
          label: 'Tuần này', fill: true
        },
        {
          data: [
            avg(prev.map(x => x.moistureScore)),
            avg(prev.map(x => x.agingScore)),
            avg(prev.map(x => x.sensitivityScore)),
            avg(prev.map(x => x.overallScore)),
            avg(prev.map(x => x.acneScore)),
            avg(prev.map(x => x.poreScore)),
            avg(prev.map(x => x.wrinkleScore)),
            avg(prev.map(x => x.pigmentationScore))
          ],
          label: 'Tuần trước', fill: true
        }
      ]
    };

    /* ---- Bar (so sánh vùng) – giả lập data */
    this.barChartData = {
      labels: this.zoneScores.map(e => e.zoneName),
      datasets: [{ data: this.zoneScores.map(e => e.score), label: 'Điểm' }]
    };

    /* ---- Pie ---- */
    this.pieChartData = {
      labels: ['Da dầu', 'Da nhạy cảm', 'Khác'],
      datasets: [{ data: [60, 23, 17] }]
    };

    // update line canvas
    this.lineChart?.update();
  }
  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
