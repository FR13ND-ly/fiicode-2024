import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'blog/';

  getArticle(index: number) {
    return this.http.get(`${this.apiUrl}get/${index}/`);
  }

  getArticles() {
    return this.http.get(`${this.apiUrl}get/all/`);
  }

  createArticle(data: any) {
    return this.http.post(`${this.apiUrl}create/`, data);
  }

  updateArticle(id: number, data: any) {
    return this.http.put(`${this.apiUrl}update/${id}/`, data);
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.apiUrl}delete/${id}/`);
  }

  createComment(data: any) {
    return this.http.post(`${this.apiUrl}comments/create/`, data);
  }

  updateComment(id: number, data: any) {
    return this.http.put(`${this.apiUrl}comments/update/${id}/`, data);
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.apiUrl}comments/delete/${id}/`);
  }

  like(data: any) {
    return this.http.post(`${this.apiUrl}like/`, data);
  }

  likeComment(data: any) {
    return this.http.post(`${this.apiUrl}comments/like/`, data);
  }

  getNotificationsLast(userId: any) {
    return this.http.get(`${this.apiUrl}notifications/get/${userId}/last/`);
  }

  getNotificationsAll(userId: any) {
    return this.http.get(`${this.apiUrl}notifications/get/${userId}/all/`);
  }

  seen(userId: any) {
    return this.http.get(`${this.apiUrl}notifications/seen/${userId}/`);
  }

  deleteNotification(id: any) {
    return this.http.get(`${this.apiUrl}notifications/delete/${id}/`);
  }
}
