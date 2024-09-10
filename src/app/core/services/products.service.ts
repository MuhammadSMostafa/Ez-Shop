import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient);

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }

  getSpecificProductsPage(page:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${page}`);
  }

  getCategoryProducts(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?category[in]=${id}`);
  }

  getProductsUsingPramas(limit:string = '',categoryId = ''):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?${limit ? `limit=${limit}&` : ''}${categoryId ? `category[in]=${categoryId}&` : ''}`);
  }

  getLimitProducts(limit:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?limit=${limit}`);
  }

  getBrandProducts(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?brand=${id}`);
  }
}
