import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'suggestions/';

  getWaiting() {
    return this.http.get(`${this.apiUrl}get/waiting/`);
  }

  getByUser(userId: number) {
    return this.http.get(`${this.apiUrl}get/by-user/${userId}/`);
  }

  getByProduct(productId: number) {
    return this.http.get(`${this.apiUrl}get/by-user/${productId}/`);
  }

  create(data: any) {
    return this.http.post(`${this.apiUrl}create/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}update/${id}/`, data);
  }

  approve(id: number) {
    return this.http.get(`${this.apiUrl}approve/${id}/`);
  }

  disapprove(id: number) {
    return this.http.get(`${this.apiUrl}disapprove/${id}/`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}delete/${id}/`);
  }
}
