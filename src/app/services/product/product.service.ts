import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SERVER, HTTP_OPTIONS_JSON } from '../../const/ServerConstants';

import { Product } from '../../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpClient = inject(HttpClient);
  baseUrl = `${SERVER}/product`;

  constructor() { }

  
  getAll() {
    return this.httpClient.get(`${this.baseUrl}`,  HTTP_OPTIONS_JSON);
  }

  get(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`,  HTTP_OPTIONS_JSON);
  }

  add(data: Product) {
    return this.httpClient.post(`${this.baseUrl}`, data, HTTP_OPTIONS_JSON);
  }

  update(data: Product) {
    return this.httpClient.put(`${this.baseUrl}`, data, HTTP_OPTIONS_JSON);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
