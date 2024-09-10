import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  loginSubscribtion!:Subscription ;
  messageErr:string = "";
  isLoading:boolean = false;

  loginForm:FormGroup = this._FormBuilder.group({
    email : [null, [Validators.required, Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/)]],
    password : [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  login():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.loginSubscribtion = this._AuthService.login(this.loginForm.value).subscribe({
      next: (res)=>{
      if(res.message == "success"){
        localStorage.setItem('userToken', res.token);
        this._Router.navigate(['/home']);
        }
      },
      error: (err:HttpErrorResponse)=>{
        this.messageErr = err.error.message;
        this.isLoading = false;
      }
    })
    } else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loginSubscribtion?.unsubscribe();
  }
}
