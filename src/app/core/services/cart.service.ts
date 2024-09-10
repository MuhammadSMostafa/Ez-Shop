import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ICart } from '../interfaces/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  userCart:WritableSignal<ICart> = signal({} as ICart);

  getCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart/`,{
      "productId": id,
    });
  }

  removeSpecificItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  updateItemCount(id:string, newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{
      "count": newCount,
    });
  }

  deleteCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/`);
  }
}
