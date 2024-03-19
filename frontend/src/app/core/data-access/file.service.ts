import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'files/';

  addFile(e: any) {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}files/add/`, formData);
  }
}
