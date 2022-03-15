import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { StepsModule } from 'primeng/steps';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryComponent } from './delivery/delivery.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentComponent } from './billing/payment/payment.component';


@NgModule({
  declarations: [CheckoutComponent, DeliveryComponent, BillingComponent, PaymentComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
