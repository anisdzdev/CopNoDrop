import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
<<<<<<< HEAD
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
=======
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
>>>>>>> origin/main
  },
  // {
  //   path: '**',
  //   //Redirect to 404
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
