import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseRequestCreate } from '../../../../core/models/expense-request.model';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RequestsService);

  id?: string;
  isEdit = false;

  form = this.fb.group({
    category: ['', Validators.required],
    description: ['', Validators.required],
    value: [0, [Validators.required, Validators.min(1)]],
    expenseDate: ['', Validators.required],
    requestedBy: ['', Validators.required],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.service.getById(this.id!).subscribe((res) => {
        this.form.patchValue({
          category: res.category,
          description: res.description,
          value: res.value,
          expenseDate: res.expenseDate,
          requestedBy: res.requestedBy,
        });
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const dto = {
      category: this.form.value.category!,
      description: this.form.value.description!,
      value: this.form.value.value!,
      expenseDate: this.form.value.expenseDate!,
      requestedBy: this.form.value.requestedBy!,
    };

    const request$ = this.isEdit ? this.service.update(this.id!, dto) : this.service.create(dto);

    request$.subscribe(() => {
      this.router.navigate(['/requests']);
    });
  }
}
