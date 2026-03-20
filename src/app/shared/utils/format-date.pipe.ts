import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const clean = value.split('T')[0];
    const parts = clean.split('-');

    if (parts.length !== 3) return value;

    const [year, month, day] = parts;

    return `${day}/${month}/${year}`;
  }
}
