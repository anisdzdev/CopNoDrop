import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent implements OnInit {
  qty:number = 1;
  products: any[] = [
    {
      img: 'https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/4/549521-v001.jpg',
      name: 'Blended Scotch Whisky Johnnie Walker Black Label 75 CL',
      price: '40',
      quantity: '750 mL',
      qty: 1
    },
    {
      img: 'https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/2/526580-v001-1.jpg',
      name: 'Blended Scotch Whisky Johnnie Walker Black Label 75 CL',
      price: '40',
      quantity: '750 mL',
      qty: 1
    },
    {
      img: 'https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/4/7/479801-v001-1_3.jpg',
      name: 'Blended Scotch Whisky Johnnie Walker Black Label 75 CL',
      price: '40',
      quantity: '750 mL',
      qty: 1
    },
    {
      img: 'https://d145dj1pf6foch.cloudfront.net/catalog/product/cache/1c3fb676c17af207704f6c7671f9267d/5/2/524695-v002.jpg',
      name: 'Blended Scotch Whisky Johnnie Walker Black Label 75 CL',
      price: '40',
      quantity: '750 mL',
      qty: 1
    },
  ];
  responsiveOptions;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {}
}
