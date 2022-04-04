import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'libs/products/model/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders:Order[] = [];
  user: User;
  subscription: Subscription[] = [];
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sellerService: SellerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

    if(this.user.isSeller == false)
    this.router.navigate(['error']);

    this._getOrders();

  }

  private _getOrders() {
    this.sellerService.getOrders(this.user.token).subscribe((orders:any) => {
      this.orders = JSON.parse(orders);
      
    });
  }


  sendOrder(order: Order){
    const id = order._id;
    this.sellerService.completeOrder(order, this.user.token).subscribe(
      (order: Order) => {
        this._getOrders();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order is delivered!`,
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not delivered!',
        });
      }
    );
  }


}
