import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {
    this.authService.getUserFromStorage();
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
}
