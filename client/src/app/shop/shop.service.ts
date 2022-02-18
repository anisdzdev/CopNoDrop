import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getProductsByCategory(cat){
    return this.http.get(`${this.url}/products/?category=${cat}`, {});
  }
}
