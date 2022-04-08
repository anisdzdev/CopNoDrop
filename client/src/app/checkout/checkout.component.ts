import { Component, OnInit } from '@angular/core';
import { Address } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: any[];
  index: number = 1;
  address: Address;
  constructor() {

  }

  ngOnInit(): void {
    this.items = [
      { label: 'Cart' },
      { label: 'Delivery Details' },
      { label: 'Checkout' },
    ];
  }

  getAddress(add){
    this.address = add;
    this.index=2;
  }

  print(){
  }
}
