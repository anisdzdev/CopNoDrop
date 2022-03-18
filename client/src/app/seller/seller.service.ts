import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'libs/products/model/products';
import { User } from '../auth/auth.service';
import { Order } from 'libs/products/model/orders';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  apiUrlProducts = environment.apiUrL + 'products';
  apiUrlUser = environment.apiUrL + 'users';
  apiUrlOrders = environment.apiUrL + 'orders';

  setHeaders(token: string) {}
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
  

    return this.http.get<Product[]>(this.apiUrlProducts);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  createProduct(productData: FormData, token: string): Observable<Product> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
  
    return this.http.post<Product>(this.apiUrlProducts, productData, requestOptions);
  }

  updateProduct(productData: FormData, productid: string, token: string): Observable<Product> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
    
    return this.http.put<Product>(`${this.apiUrlProducts}/${productid}`, productData, requestOptions);
  }

  deleteProduct(productId: string, token: string): Observable<any> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
    return this.http.delete<any>(`${this.apiUrlProducts}/${productId}`, requestOptions);
  }


  updateUser(user: User, token: string): Observable<User> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
   
    return this.http.put<User>(`${this.apiUrlUser}/${user._id}`, user, requestOptions);
}

  getOrders(token: string){
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
    

    return this.http.get<Order[]>(`${this.apiUrlOrders}?sellerMode=true`, requestOptions);
  }

  completeOrder(order: Order, token: string): Observable<User> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
   
    return this.http.put<User>(`${this.apiUrlOrders}/complete/${order._id}`, requestOptions);
}

}
