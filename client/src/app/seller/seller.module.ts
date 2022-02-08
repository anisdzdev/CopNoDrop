import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductsComponent } from './products/products.component';
import { SellerComponent } from './seller.component';


//primeng 
import {AccordionModule} from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';


@NgModule({
  declarations: [
    OrdersComponent,
    MyAccountComponent,
    ProductsComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    AccordionModule,
    SliderModule
  ]
})
export class SellerModule { }
