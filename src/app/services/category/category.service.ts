import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SERVER, HTTP_OPTIONS_JSON } from '../../const/ServerConstants';
import { Category } from '../../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient = inject(HttpClient);
  
  baseUrl = `${SERVER}/category`;

  constructor() { }

  
  getAll() {
    return this.httpClient.get(`${this.baseUrl}/list`,  HTTP_OPTIONS_JSON);
  }

  get(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`,  HTTP_OPTIONS_JSON);
  }

  add(data: Category) {
    return this.httpClient.post(`${this.baseUrl}`, data, HTTP_OPTIONS_JSON);
  }

  update(data: Category) {
    return this.httpClient.put(`${this.baseUrl}`, data, HTTP_OPTIONS_JSON);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
