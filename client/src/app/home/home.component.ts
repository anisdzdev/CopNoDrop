import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: any[] = [
    {
      src: 'https://d145dj1pf6foch.cloudfront.net/Jif-Home-Page-Banner-1180x400px-.jpg',
    },
    { src: 'https://d145dj1pf6foch.cloudfront.net/Evergreen-15_-1180X400.jpg' },
  ];

  categories: any[] = [
    {"cate" : "Electronics",img: '/assets/computer.png', link: 'Electronics'},
    {"cate" : "Gaming Accessories",img: '/assets/gamingmouse.png', link: 'Gaming'},
    {"cate" : "Clothing",img: '/assets/shirt.png', link: 'Clothing'},
    {"cate" : "Sports Gear",img: '/assets/sportshoes.png', link: 'Sports'},
    {"cate" : "Home Appliances",img: '/assets/microwave.png', link: 'Home'},
    {"cate" : "Travel Gear",img: '/assets/luggage.png', link: 'Travel'},
    {"cate" : "Personal Care",img: '/assets/shampoo.png', link: 'Beauty'}
  ];
  constructor() {}

  ngOnInit(): void {}
}
