import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  baseURL: string = 'http://localhost:3000/';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.min(5),
      Validators.max(255)
    ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.max(1024),
        Validators.min(5)
    ]),
  });
  subscriptions: Subscription[] = [];
  isLogged: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserFromStorage();
    const sub = this.authService.islogin$.subscribe(
      (value) => (this.isLogged = value)
    );
    console.log(this.isLogged);

    if (this.isLogged) router.navigateByUrl('');
    this.subscriptions.push(sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.map((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {}

  submit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      const user: User = this.authService.getDecodedAccessToken(res);
      user.token = res;
      this.authService.setUserToStorage(user);
      this.authService.isloginSubject.next(true);
      this.authService.alertMessage(
        'Success!',
        'You are now logged in',
        'success'
      );
      this.router.navigateByUrl('');
    });
  }
}
