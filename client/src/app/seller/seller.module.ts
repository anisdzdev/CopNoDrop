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
import { MainPageComponent } from './main-page/main-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';




@NgModule({
  declarations: [
    OrdersComponent,
    MyAccountComponent,
    ProductsComponent,
    SellerComponent,
    MainPageComponent,
    SidebarComponent,
    MenuPanelComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    AccordionModule,
    SliderModule,
    PanelMenuModule,
    PanelModule
  ]
})
export class SellerModule { }
