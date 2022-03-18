import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  name = "";
  card_number ="";
  billingForm: FormGroup;
  checkoutClicked :boolean ;

  constructor() {
    this.billingForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      card_number: new FormControl('', [Validators.required]),
      expiration: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {

  }
  transform(value) {
    if (value != null) {
      value = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    return value;
  }

  verifyForm(): boolean{
    this.checkoutClicked = true;
    return this.billingForm.valid;
  }
}
