import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let msg = 'Error desconocido.';

        if (err.status === 0) {
          msg = 'No hay conexión con el servidor.';
        } else if (err.status === 400) {
          msg = err.error?.detail || 'Solicitud incorrecta.';
        } else if (err.status === 404) {
          msg = 'No se encontró el recurso solicitado.';
        } else if (err.status === 409) {
          msg = err.error?.detail || 'Conflicto de negocio.';
        } else if (err.status >= 500) {
          msg = 'Error en el servidor.';
        }

        alert(msg);

        return throwError(() => err);
      }),
    );
  }
}
