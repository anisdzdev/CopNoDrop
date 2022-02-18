import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countriesLib from 'i18n-iso-countries';


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

  
  

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      province: ['', Validators.required],
      phone: ['', Validators.required],
      firstLine: [''],
      postal_code: [''],
      city: [''],
      country: [''],
      isDefault: [false]
    });
  }

  isSubmitted() {}

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map(entry => {
        return {
            id: entry[0],
            name: entry[1]
        }
    });
}

  showDialog(){
    this.display = true;
  }



}
