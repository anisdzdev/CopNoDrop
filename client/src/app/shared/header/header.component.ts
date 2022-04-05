import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  user;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUserFromStorage();
    const sub = this.authService.islogin$.subscribe(value => this.isLogged = value);
    this.subscriptions.push(sub)
  }


  ngOnInit(): void {}

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  reMyAccount(){
    if(this.user.isSeller) this.router.navigateByUrl("/seller");
    else this.router.navigateByUrl("/buyer");
  }
}
