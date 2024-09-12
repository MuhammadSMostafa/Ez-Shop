import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../interfaces/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData:IUser|null = null;

  login(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  register(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      localStorage.setItem('userId', this.userData?.id!);
    }
  }

  signOut():void{
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this._Router.navigate(['/login']);
    this.userData = null;
  }

  verifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }

  verifyResetCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
