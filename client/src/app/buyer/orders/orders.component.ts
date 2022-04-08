import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ShopService } from 'src/app/shop/shop.service';
import { buyerService } from '../buyer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  user: User;
  subscription: Subscription[] = [];
  isLoggedIn: boolean;
  orders;
  constructor(
    private router: Router,
    private authService: AuthService,
    private buyerService: buyerService,
    private shopService: ShopService,
    private sharedService: SharedService
  ) { }

  ngOnDestroy(): void {
    this.subscription.map((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.authService.getUserFromStorage();
    const sub = this.authService.isloginSubject.subscribe(
      (value) => (this.isLoggedIn = value)
    );
    this.subscription.push(sub);

    if (this.isLoggedIn) {
      this.user = this.authService.getUserFromStorage();
    } else {
      this.router.navigateByUrl('');
    }

    this._getOrders();
  }

  private _getOrders() {
    this.buyerService.getOrders(this.user.token).subscribe((orders: any) => {
      this.orders = JSON.parse(orders);
      this.orders.forEach(order => {
        this.shopService.getProductDescription(order.product.id).subscribe((res: any) => {
          order.productName = res.name;
          order.image = res.images[0];
          order.total = res.price.$numberDecimal*(1.1499)*order.product.quantity;
          order.cat = res.category;
        })
      })
      console.log(this.orders);

    });
  }

  cancelOrder(order) {
    this.buyerService.cancelOrder(order, this.user.token).subscribe((res) => {
      order.state = "Cancelled";
      this.sharedService.alertMessage("Success", "Order Canceled Successfully");
    });

  }
}
