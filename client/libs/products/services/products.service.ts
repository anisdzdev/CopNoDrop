import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/products';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    apiUrlProducts = environment.apiUrL + 'products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrlProducts);
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
    }

    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiUrlProducts, productData);
    }

    updateProduct(productData: FormData, productid: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrlProducts}/${productid}`, productData);
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlProducts}/${productId}`);
    }
}
