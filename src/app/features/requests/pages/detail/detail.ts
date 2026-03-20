import { Component, inject, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpenseRequest } from '../../../../core/models/expense-request.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink, MatButtonModule, FormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  private readonly service = inject(RequestsService);
  private readonly route = inject(ActivatedRoute);

  id!: string;
  data?: ExpenseRequest;

  rejectReason: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.load();
  }

  load() {
    this.service.getById(this.id).subscribe((res) => (this.data = res));
  }

  approve() {
    this.service.approve(this.id, { decisionBy: 'admin' }).subscribe(() => this.load());
  }

  reject() {
    if (!this.rejectReason.trim()) {
      alert('Debe ingresar un motivo de rechazo');
      return;
    }

    this.service
      .reject(this.id, {
        decisionBy: 'admin',
        reason: this.rejectReason,
      })
      .subscribe(() => this.load());
  }
}
