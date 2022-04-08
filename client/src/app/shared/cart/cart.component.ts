import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  products: any[] = [];
  total: number = 0;
  isLogged: boolean;
  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService, private authService: AuthService, private router: Router) {
    this.products = this.sharedService.getCartItems();
    this.updateTotal();
    const sub = this.authService.islogin$.subscribe(value => this.isLogged = value);
    this.subscriptions.push(sub)

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
    this.sharedService.addProductsToCart(this.products);
    this.updateTotal();
  }

  updateTotal(): void{
    let total: number = 0;

    if(this.products && this.products.length==0){
      this.total = 0
    }else{
      // this.products.map(product => total = total + +product.price);
      this.products.forEach(product => total += +product.price.$numberDecimal*product.quantity);
      this.total = total;
      this.sharedService.addProductsToCart(this.products);
    }

  }

  toCheckout(): void{
    if(this.isLogged) this.router.navigateByUrl("/checkout");
    else {
      this.authService.alertMessage(
        'Warning!',
        'You Must Login Before Checkout!',
        'warn'
      );
      this.router.navigateByUrl("/auth/login");
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
