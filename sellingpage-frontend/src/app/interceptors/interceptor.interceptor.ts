import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = localStorage.getItem('token')
    //401 TOKEN EXPIRADO
    //403 PROIBIDO/SEM PERM
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    /*     const secureReq = request.clone({
          url: request.url.replace('http://', 'https://')
        }); */
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          /*  */
          alert("Você está deslogado, logue novamente.");
          localStorage.clear()
          this.router.navigate(['/login']);
          return throwError(error);

        } else if (error.status == 403) {
          alert("Você não possui permissão para isso.")
        }
        return throwError(error)
      })
    );
  }
}
