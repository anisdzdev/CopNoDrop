import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = environment.apiUrL + 'orders';

  constructor(private http: HttpClient) {}

  placeOrder(form, token: string) {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
    return this.http.post(`${this.url}`, form, requestOptions);
  }
}

export interface Address {
  firstLine: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
}
