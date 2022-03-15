import { Component, OnInit } from '@angular/core';
import IMask from 'imask'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  name = "";
  card_number ="";
  constructor() {

   }

  ngOnInit(): void {

  }
  transform(value) {
    if (value != null) {
      value = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    return value;
  }
}
