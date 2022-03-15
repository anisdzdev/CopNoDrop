import { Component, Input, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Address, CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  user: User;
  @Input() address: Address
  constructor(private sharedService: SharedService, private authService: AuthService, private checkoutService: CheckoutService) {
    this.user = this.authService.getUserFromStorage();
  }

  ngOnInit(): void {
  }

  checkout(){
    let data = {
      products : this.sharedService.getCartItems(),
      address : this.address,
      total: 10

    }
    console.log(this.user.token);

    this.checkoutService.placeOrder(data, this.user.token).subscribe(
      (res)=>{
        console.log(res);

      },
      (err) =>{
        console.log(err);
      }
    )
  }
}
