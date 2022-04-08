import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { Order } from 'libs/products/model/orders';
import { Product } from 'libs/products/model/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
import { SellerService } from '../seller.service';

declare const require;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  form: FormGroup;
  countries = [];
  display: boolean = false;
  subscription: Subscription[] = [];
  isLoggedIn: boolean;
  user: User;
  products: Product[] = [];
  product: Product;
  

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
    this._initUserForm();
    this._getCountries();

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


    if(this.user.isSeller == false)
    this.router.navigate(['error']);

    this._fillForm();
    // the _getProducts is if the name changed it should also change in the creator of the products
    this._getProducts();
  
  }




  private _getProducts() {
    this.sellerService.getProducts().subscribe((products) => {
      this.products = products.filter(
        (data) => data.creator.id == this.user._id
      );
    });
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      province: ['', Validators.required],
      phone: ['', Validators.required],
      firstLine: [''],
      postal_code: [''],
      city: [''],
      country: [''],
      isDefault: [false],
    });
  }

  private _fillForm() {
    this.form.controls.firstName.setValue(this.user.firstName);
    this.form.controls.lastName.setValue(this.user.lastName);
    this.form.controls.email.setValue(this.user.email);
    this.form.controls.firstLine.setValue(this.user.addresses?.firstLine);
    this.form.controls.province.setValue(this.user.addresses?.province);
    this.form.controls.postal_code.setValue(this.user.addresses?.postal_code);
    this.form.controls.city.setValue(this.user.addresses?.city);
    this.form.controls.country.setValue(this.user.addresses?.country);
    this.form.controls.isDefault.setValue(this.user.addresses?.isDefault);
    this.form.controls.password.setValue(this.user.password);
  }

  isSubmitted() {}

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  showDialog() {
    this.display = true;
  }

  saveInfo() {
  
    // if (this.form.invalid) {
    //   return;
    // }
    let pass: any;
    
    if(this.form.controls.password1 == null){
      pass = this.form.controls.password.value;
    }else if(this.form.controls.password1 == this.form.controls.password2){
      pass = this.form.controls.password1.value;
    }else{
      return;
    }

    const user: User = {
      _id: this.user._id,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: pass,
      isSeller: this.user.isSeller,

      addresses: {
        firstLine: this.form.controls.firstLine.value,
        city: this.form.controls.city.value,
        province: this.form.controls.province.value,
        country: this.form.controls.country.value,
        postal_code: this.form.controls.postal_code.value,
        isDefault: this.form.controls.isDefault.value,
      },

      token: this.user.token,
      iat: this.user.iat,
    };

    this._updateUser(user);

    // update the creator of the products.
    this.products.forEach((product) => {
      (product.creator.firstName = this.user.firstName),
        (product.creator.lastName = this.user.lastName);
    });

  

  }

  private _updateUser(user: User) {
    
    this.sellerService.updateUser(user, this.user.token).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      }
    );
  }

 




}
