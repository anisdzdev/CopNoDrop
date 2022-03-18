import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any = [];
  category;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.cat) this.category = params.cat;
      this.shopService
        .getProductsByCategory(this.category)
        .subscribe((res) => (this.products = res));
    });
  }

  addToCart(product) {
    const prod = {
      id: product._id,
      img: product.images[0],
      name: product.name,
      quantity: 1,
      price: product.price.$numberDecimal,
      seller_id: product.creator.id
    };

    this.sharedService.addToCart(prod);
    this.sharedService.alertMessage(
      'Success!',
      'Item added to cart!',
      'success'
    );
  }

}
