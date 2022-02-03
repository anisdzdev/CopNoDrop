import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductsComponent } from './products/products.component';
import {AccordionModule} from 'primeng/accordion';


@NgModule({
  declarations: [
    OrdersComponent,
    MyAccountComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    AccordionModule
  ]
})
export class SellerModule { }
