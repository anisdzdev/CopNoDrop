import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    UserComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],

})
export class UserModule { }
