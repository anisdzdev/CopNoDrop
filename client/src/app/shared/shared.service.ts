import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url = environment.apiUrL;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  addToCart(product: any) {
    let existingEntries: any[] = [];
    if (localStorage.getItem("cart-items")) {
      existingEntries = JSON.parse(localStorage.getItem('cart-items') || '{}');
    }
    if (existingEntries == null) existingEntries = [];
    existingEntries.push(product);
    localStorage.setItem("cart-items", JSON.stringify(existingEntries));
  }

  addProductsToCart(products: any[]) {
    localStorage.setItem("cart-items", JSON.stringify(products));
  }

  getCartItems(): any {
    let items = JSON.parse(localStorage.getItem('cart-items') || '{}');
    return items;
  }

  clearCartItem() {
    localStorage.setItem("cart-items", JSON.stringify([]));
  }
  alertMessage(title: string, message: string, type?) {
    setTimeout(() => {
      this.messageService.add({
        severity: type || 'success',
        summary: title,
        detail: message,
      });
    }, 100);
  }

  searchProduct(name) {
    return this.http.get(this.url + "products/?query=" + name);
  }
}
