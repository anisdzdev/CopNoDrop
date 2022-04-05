import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
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
    private buyerService: buyerService
  ) {}

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
    });
  }

  cancelOrder(order) {
    order.state = 'delivered';
    this.buyerService.cancelOrder(order, this.user.token).subscribe();
  }
}
