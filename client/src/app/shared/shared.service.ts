import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  addToCart(product: any){
    let existingEntries: any[] = [];
    if(localStorage.getItem("cart-items")){
      existingEntries = JSON.parse(localStorage.getItem('cart-items') || '{}');
    }
    if(existingEntries == null) existingEntries = [];
    existingEntries.push(product);
    localStorage.setItem("cart-items", JSON.stringify(existingEntries));
  }

  getCartItems(): any{
    let items = JSON.parse(localStorage.getItem('cart-items') || '{}');
    return items ;
  }
}
