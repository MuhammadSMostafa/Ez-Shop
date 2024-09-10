import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient);

  cashOrder(id:string, shippingAddress:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,{
      "shippingAddress": shippingAddress,
    })
  }

  payWithCard(id:string, shippingAddress:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.hostUrl}`,{
      "shippingAddress": shippingAddress,
    })
  }

  getOrders():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${localStorage.getItem('userId')}`)
  }
}
