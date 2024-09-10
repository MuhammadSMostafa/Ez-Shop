import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  wishlistIds:WritableSignal<string[]> = signal([]);

  getWishlist():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  addToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist/`,{
      "productId": id,
    })
  }

  removeFromtWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }
}
