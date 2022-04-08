import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
  product;
  id;
  constructor(
    private shopService: ShopService,
    private sharedService: SharedService, private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.shopService.getProductDescription(this.id).subscribe((res) => { this.product = res; });
    });

  }

  addToCart() {
    // console.log(this.product.creator);
    console.log(JSON.stringify(this.product.creator));

    this.product.quantity = 1;
    this.sharedService.addToCart(this.product);
    this.sharedService.alertMessage("Success!", "Item added to cart successfully!", "success");
  }


}
