import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: MenuItem[] = [];
  products: any[] = [];

  constructor(private sharedService: SharedService) {
    this.products = this.sharedService.getCartItems();
    console.log(this.products);
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Cart' },
      { label: 'Delivery Details' },
      { label: 'Checkout' },
    ];
  }

  remove(index: number){
    this.products.splice(index, 1);
    console.log(this.products);
    this.sharedService.addProductsToCart(this.products);
  }
}

// name*	string
// description*	string
// category*	string
// price*	number
