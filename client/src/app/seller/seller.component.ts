import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  points = 0;
  price = 0;
  user = {
    name: 'Marc Eid',
  };

  constructor() {}

  ngOnInit(): void {}
}
