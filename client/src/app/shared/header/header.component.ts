import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  user;
  items: MenuItem[];
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUserFromStorage();
    const sub = this.authService.islogin$.subscribe(value =>{
      this.isLogged = value
      if(!this.isLogged){
        this.items = [
          {
            label: 'Categories',
            items: [
              { label: 'Electronics', routerLink: '/shop/list', queryParams: { cat: 'Electronics' } },
              { label: 'Gaming Accessories', routerLink: '/shop/list', queryParams: { cat: 'Gaming' } },
              { label: 'Clothing', routerLink: '/shop/list', queryParams: { cat: 'Clothing' } },
              { label: 'Sports', routerLink: '/shop/list', queryParams: { cat: 'Sports' } },
              { label: 'Home', routerLink: '/shop/list', queryParams: { cat: 'Home Appliances' } },
              { label: 'Travel Gear', routerLink: '/shop/list', queryParams: { cat: 'Travel' } },
              { label: 'Beauty & Personal care', routerLink: '/shop/list', queryParams: { cat: 'Beauty' } },
            ]
          },
          {
            label: 'Log in',
            routerLink: '/auth/login'
          }
        ]
      }else{
        this.items = [
          {
            label: 'Categories',
            items: [
              { label: 'Electronics', routerLink: '/shop/list', queryParams: { cat: 'Electronics' } },
              { label: 'Gaming Accessories', routerLink: '/shop/list', queryParams: { cat: 'Gaming' } },
              { label: 'Clothing', routerLink: '/shop/list', queryParams: { cat: 'Clothing' } },
              { label: 'Sports', routerLink: '/shop/list', queryParams: { cat: 'Sports' } },
              { label: 'Home', routerLink: '/shop/list', queryParams: { cat: 'Home Appliances' } },
              { label: 'Travel Gear', routerLink: '/shop/list', queryParams: { cat: 'Travel' } },
              { label: 'Beauty & Personal care', routerLink: '/shop/list', queryParams: { cat: 'Beauty' } },
            ]
          },
          {
            label: 'My Account',
            command: (e) => this.reMyAccount()
          },
          {
            label: 'Logout',
            icon: "pi pi-fw pi-sign-out",
            command: (e) => this.logout()
          }
        ]
      }
    });
    this.subscriptions.push(sub)
  }
  queryParams?: {
    [k: string]: any;
  };

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  reMyAccount() {
    this.user = this.authService.getUserFromStorage();
    if (this.user.isSeller) this.router.navigateByUrl("/seller");
    else this.router.navigateByUrl("/buyer");
  }
}
