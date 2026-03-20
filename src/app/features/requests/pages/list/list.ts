import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { ExpenseRequest } from '../../../../core/models/expense-request.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Loading } from '../../../../shared/components/loading/loading';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Loading,
    EmptyState,
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  private readonly service = inject(RequestsService);
  private readonly fb = inject(FormBuilder);

  loading = false;
  data: ExpenseRequest[] = [];

  form = this.fb.group({
    estado: [''],
    categoria: [''],
    fechaDesde: [''],
    fechaHasta: [''],
  });

  displayedColumns = ['category', 'description', 'value', 'status', 'actions'];

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading = true;

    const filters = this.form.value;

    this.service.getAll(filters).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
