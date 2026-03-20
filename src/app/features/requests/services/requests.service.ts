import { Injectable, inject } from '@angular/core';
import {
  ExpenseRequest,
  ExpenseRequestCreate,
  ExpenseRequestUpdate,
  DecisionDto,
  RejectDto,
} from '../../../core/models/expense-request.model';
import { ExpenseRequestMetrics } from '../../../core/models/metrics.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private readonly api = inject(ApiService);

  getAll(filters: any) {
    return this.api.get<ExpenseRequest[]>('/api/solicitudes', filters);
  }

  getById(id: string) {
    return this.api.get<ExpenseRequest>(`/api/solicitudes/${id}`);
  }

  create(dto: ExpenseRequestCreate) {
    return this.api.post<ExpenseRequest>('/api/solicitudes', dto);
  }

  update(id: string, dto: ExpenseRequestUpdate) {
    return this.api.put<ExpenseRequest>(`/api/solicitudes/${id}`, dto);
  }

  approve(id: string, dto: DecisionDto) {
    return this.api.post<ExpenseRequest>(`/api/solicitudes/${id}/approve`, dto);
  }

  reject(id: string, dto: RejectDto) {
    return this.api.post<ExpenseRequest>(`/api/solicitudes/${id}/reject`, dto);
  }

  metrics() {
    return this.api.get<ExpenseRequestMetrics>('/api/solicitudes/metrics');
  }
}
