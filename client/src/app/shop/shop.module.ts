import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductListComponent } from './product-list/product-list.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductDescriptionComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ProductListComponent
  ]
})
export class ShopModule { }
