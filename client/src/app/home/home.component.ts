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
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  constructor() {}

  ngOnInit(): void {}
}
