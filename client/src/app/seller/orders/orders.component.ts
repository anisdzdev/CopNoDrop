import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders;

  constructor() {
  this.orders = [
    {
      id: "123456",
      date: "Jan 24, 2020",
      time: "20:04",
      total: 150.50,
      products: [
        {img: "https://d145dj1pf6foch.cloudfront.net/Jif-Home-Page-Banner-1180x400px-.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Evergreen-15_-1180X400.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Jif-Home-Page-Banner-1180x400px-.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Evergreen-15_-1180X400.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Jif-Home-Page-Banner-1180x400px-.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Evergreen-15_-1180X400.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Jif-Home-Page-Banner-1180x400px-.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/Evergreen-15_-1180X400.jpg"},
      ]
    }

  ]
  }

  ngOnInit(): void {

  }
}
