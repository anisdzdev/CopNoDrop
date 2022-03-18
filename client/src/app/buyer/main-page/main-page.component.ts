import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
user;
  constructor(private auth: AuthService) {
    this.user = this.auth.getUserFromStorage();
    console.log(this.user);

  }

  ngOnInit(): void {}
}
