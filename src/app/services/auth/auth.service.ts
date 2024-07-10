import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SERVER } from '../../const/ServerConstants';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);


  constructor() { }

  signup(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(`${SERVER}/users/register`, data, httpOptions);
  }

  login(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post(`${SERVER}/users/login`, data, httpOptions)
      .pipe(tap((result:any) => {
        localStorage.setItem('authUser', result.token); 
      }),
      
    );
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
