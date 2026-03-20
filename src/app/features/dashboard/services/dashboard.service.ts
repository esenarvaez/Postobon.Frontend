import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ExpenseRequestMetrics } from '../../../core/models/metrics.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly api = inject(ApiService);

  getMetrics() {
    return this.api.get<ExpenseRequestMetrics>('/api/solicitudes/metrics');
  }
}
