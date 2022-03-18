import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: []
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class buyerRoutingModule {}
