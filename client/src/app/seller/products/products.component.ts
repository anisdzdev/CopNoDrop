import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = [];
  isNavOpen: boolean = false;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onTriggerNav() {
    this.isNavOpen = !this.isNavOpen;
    this.changeDetectorRef.detectChanges();
  }
}
