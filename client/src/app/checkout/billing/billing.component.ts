import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Address, CheckoutService } from '../checkout.service';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  user: User;
  orderIDs: any[] = [];
  orders: any[];
  @Input() address: Address;
  @ViewChild('childComponent', { static: false })
  childComponent: PaymentComponent;
  orderComplete: boolean = false;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) {
    this.user = this.authService.getUserFromStorage();
  }

  ngOnInit(): void {}

  checkout() {
    if (!this.childComponent.verifyForm()) return;
    let data = {
      products: this.sharedService.getCartItems(),
      address: this.address,
      total: 10,
    };
    this.checkoutService.placeOrder(data, this.user.token).subscribe((res:any) => {
      this.orders = JSON.parse(res);
      this.orders.forEach(order => this.orderIDs.push(order._id));
      this.orderComplete = true;
      this.sharedService.alertMessage(
        'Success!',
        'Your order is complete.',
        'success'
      );
      this.sharedService.clearCartItem();
      },
      (err) => {
        this.sharedService.alertMessage(
          'Error!',
          'An Error has occureed please try again later',
          'error'
        );
      }
    );

  }
}
