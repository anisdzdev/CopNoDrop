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
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
        {img: "https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg"},
      ]
    }

  ]
  }

  ngOnInit(): void {

  }
}
