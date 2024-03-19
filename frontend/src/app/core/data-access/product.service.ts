import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'products/';

  getAllProducts() {
    return this.http.get(`${this.apiUrl}get/all/`);
  }

  getProduct(id: number) {
    console.log(id);
    return this.http.get(`${this.apiUrl}get/${id}/`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}create/`, data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put(`${this.apiUrl}update/${id}/`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}delete/${id}/`);
  }

  getComments(productId: number) {
    return this.http.get(`${this.apiUrl}comments/get/${productId}/`);
  }

  createComment(data: any) {
    return this.http.post(`${this.apiUrl}comments/create/`, data);
  }

  updateComment(id: any, data: any) {
    return this.http.put(`${this.apiUrl}comments/update/${id}/`, data);
  }

  deleteComment(id: any) {
    return this.http.delete(`${this.apiUrl}comments/delete/${id}/`);
  }

  vote(data: any) {
    return this.http.post(`${this.apiUrl}vote/`, data);
  }

  getFavorites(userId: number) {
    return this.http.get(`${this.apiUrl}favorite/get/${userId}/`);
  }

  favorite(data: any) {
    return this.http.post(`${this.apiUrl}favorite/`, data);
  }

  getPrefAllergens() {
    return this.http.get(`${this.apiUrl}prefs/allergens/`);
  }

  getPrefIngredients() {
    return this.http.get(`${this.apiUrl}prefs/ingredients/`);
  }

  getPrefCategories() {
    return this.http.get(`${this.apiUrl}prefs/categories/`);
  }

  getSimilar(id: any) {
    return this.http.get(`${this.apiUrl}similar/${id}/`);
  }

  getRecommendations(userId: any) {
    return this.http.get(`${this.apiUrl}recommendations/${userId}/`);
  }
}
