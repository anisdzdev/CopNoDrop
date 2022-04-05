import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { buyerRoutingModule } from './buyer-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { buyerComponent } from './buyer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
FormsModule
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
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RippleModule} from 'primeng/ripple';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    OrdersComponent,
    MyAccountComponent,
    buyerComponent,
    MainPageComponent,
    SidebarComponent,
    MenuPanelComponent,
  ],
  imports: [
    CommonModule,
    buyerRoutingModule,
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
    DividerModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    HttpClientModule,
    TableModule,
    ConfirmDialogModule,
    RippleModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class buyerModule { }
