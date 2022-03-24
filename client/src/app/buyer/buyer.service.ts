import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class buyerService {
  apiUrl = environment.apiUrL;

  setHeaders(token: string) {
  }

  constructor(private http: HttpClient) {
  }

  getOrders(token: string) {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };
    return this.http.get(this.apiUrl + "orders" + "?sellerMode=false", requestOptions);
  }

  cancelOrder(order, token: string): Observable<any> {
    let requestOptions: Object = {
      headers: new HttpHeaders().append(
        'x-auth-token',
        token
      ),
      responseType: 'text',
    };

    return this.http.put(this.apiUrl + "orders/cancel/" + order._id, requestOptions);
  }

}
