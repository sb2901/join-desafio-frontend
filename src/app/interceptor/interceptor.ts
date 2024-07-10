import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ERROR, LOGIN } from '../const/ServerConstants';

export const interceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);

    return next(req).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse  && err.status === 401 ) {
             
              //logout e tela de login
              console.error('Unauthorized request:', err);
              router.navigate([LOGIN]);
              
           
          }else{
            router.navigate([ERROR]);
          }
          return throwError(() => err); 
        })
      );  


};
