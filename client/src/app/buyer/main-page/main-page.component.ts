import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  points = 0;
  numberOfOrders = 0;
  credit = 0;
  user = {
    name: 'abo mohamed',
  };
  constructor() {}

  ngOnInit(): void {}
}
