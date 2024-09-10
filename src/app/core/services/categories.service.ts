import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient);

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }

  getAllSubCategories(page:string = ''):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories/?page=${page}`);
  }
}
