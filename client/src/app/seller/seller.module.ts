import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SellerRoutingModule } from './seller-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductsComponent } from './products/products.component';
import { SellerComponent } from './seller.component';
import { ReactiveFormsModule } from '@angular/forms';

//primeng 
import {AccordionModule} from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';
import { MainPageComponent } from './main-page/main-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';

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
    PanelModule,
    ReactiveFormsModule,
    CardModule,
    DropdownModule,
    ToggleButtonModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    PasswordModule,
    DividerModule
  ]
})
export class SellerModule { }
