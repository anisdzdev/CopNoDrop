import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../checkout.service';
import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  items: any[];
  user: User;
  deliveryForm: FormGroup;
  nextClicked: boolean = false;
  @Output() address = new EventEmitter<Address>();

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserFromStorage();
    this.deliveryForm = new FormGroup({
      firstLine: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Cart' },
      { label: 'Delivery Details' },
      { label: 'Checkout' },
    ];
  }

  verifyForm(value: Address){
    this.nextClicked = true
    if(this.deliveryForm.valid) this.next(value);
  }

  next(value: Address) {
    this.address.emit(value);
  }
}
