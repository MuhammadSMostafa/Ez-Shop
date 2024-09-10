import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private readonly _HttpClient = inject(HttpClient);

  getAllAddresses():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses`);
  }

  addAddress(address:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/addresses`,
      address
    );
  }

  getSpecificAddress(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses/${id}`);
  }
}
