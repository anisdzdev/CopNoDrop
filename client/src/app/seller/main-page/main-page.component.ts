import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'libs/products/model/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  points = 0;
  numberOfOrders = 0;
  credit = 0;
  user: User;

  orders:Order[] = [];
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
    this._getOrders();
  }


  private _getOrders() {
    this.sellerService.getOrders(this.user.token).subscribe((orders:any) => {
      this.orders = JSON.parse(orders);
      
    });
  }




}
