import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'libs/products/model/products';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../seller.service';
import { AuthService, User } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productDialog: boolean;
  products: Product[] = [];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  productForm: FormGroup;
  editmode: boolean = false;
  firstImage: string;
  secondImage: string;
  isLoggedIn: boolean;
  user: User;
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sellerService: SellerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.subscription.map((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.authService.getUserFromStorage();
    const sub = this.authService.isloginSubject.subscribe(
      (value) => (this.isLoggedIn = value)
    );
    this.subscription.push(sub);

    if (this.isLoggedIn) {
      this.user = this.authService.getUserFromStorage();
    } else {
      this.router.navigateByUrl('');
    }
    
    this._getProducts();
    // this.products = this.products.filter((data: Product) => {data.creator.id == this.user._id});


    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      // quantity: ['', Validators.required],
      description: ['', Validators.required],
      images: [''],
      creator: ['', Validators.required],
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.editmode = true;
    this.product = { ...product };
    this.productDialog = true;
  }

  private _getProducts() {
    this.sellerService.getProducts().subscribe((products) => {
      this.products = products.filter( (data) => data.creator.id == this.user._id);
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sellerService
          .deleteProduct(product._id, this.user.token)
          .subscribe(
            () => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted!',
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted!',
              });
            }
          );
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.product.images = [];

    this.submitted = true;
    this.product.images.push(this.firstImage);

    if (this.secondImage) this.product.images.push(this.secondImage);

    if (this.product.name.trim()) {
      if (this.editmode == true) {
        // this.products[this.findIndexById(this.product.id)] = this.product;
        this.fillProductForm();
        this._updateProduct(this.productForm.value);
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Product Updated',
        //   life: 3000,
        // });
      } else {
        // this.product.id = this.createId();
        // this.product.image = 'product-placeholder.svg';
        this.fillProductForm();
        this.products.push(this.product);
        this.sellerService
          .createProduct(this.productForm.value, this.user.token)
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Created',
                life: 3000,
              });
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail:
                  'An error has occured while adding the product. Try again later',
                life: 3000,
              });
            }
          );
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  fillProductForm() {
    this.productForm.get('name').setValue(this.product.name);
    this.productForm.get('price').setValue(this.product.price);
    this.productForm.get('category').setValue(this.product.category);
    this.productForm.get('description').setValue(this.product.description);
    this.productForm.get('images').setValue(this.product.images);
  }

  private _updateProduct(productFormData: FormData) {
    this.sellerService
      .updateProduct(productFormData, this.product._id)
      .subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is updated!`,
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        }
      );
  }
}
