import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ERROR, LOGIN } from '../const/ServerConstants';
import { AuthService } from '../services/auth/auth.service';

export const interceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);
    const authService = inject(AuthService);

    const authToken = localStorage.getItem('authUser');
    if (authToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      req = cloned;
  
    } 

    return next(req).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse  && err.status === 401 ) {
             
              //logout e tela de login
              console.error('Unauthorized request:', err);
              authService.logout();
              router.navigate([LOGIN]);
              
           
          }else{
            router.navigate([ERROR]);
          }
          return throwError(() => err); 
        })
      );  


};
