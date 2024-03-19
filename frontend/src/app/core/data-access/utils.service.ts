import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  http = inject(HttpClient);

  getProductFromApi(code: any) {
    return this.http.get(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`
    );
  }
}
