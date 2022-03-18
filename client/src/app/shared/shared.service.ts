import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private messageService: MessageService) { }

  addToCart(product: any){
    let existingEntries: any[] = [];
    if(localStorage.getItem("cart-items")){
      existingEntries = JSON.parse(localStorage.getItem('cart-items') || '{}');
    }
    if(existingEntries == null) existingEntries = [];
    existingEntries.push(product);
    localStorage.setItem("cart-items", JSON.stringify(existingEntries));
  }

  addProductsToCart(products: any[]){
    localStorage.setItem("cart-items", JSON.stringify(products));
  }

  getCartItems(): any{
    let items = JSON.parse(localStorage.getItem('cart-items') || '{}');
    return items ;
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
}
