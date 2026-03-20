import { Component, inject, OnInit } from '@angular/core';
import { ExpenseRequestMetrics } from '../../../../core/models/metrics.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly service = inject(DashboardService);

  metrics?: ExpenseRequestMetrics;
  loading = true;

  ngOnInit(): void {
    this.service.getMetrics().subscribe((res) => {
      this.metrics = res;
      this.loading = false;
    });
  }
}
