import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  verifyEmailSubscription!:Subscription;
  verifyCodeSubscription!:Subscription;
  resetPasswordSubscription!:Subscription;
  isLoading:boolean = false;
  step:number = 1;
  messageErr:string = "";

  verifyEmailForm:FormGroup = this._FormBuilder.group({
    email : [null, [Validators.required, Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/)]],
  });

  verifyCodeForm:FormGroup = this._FormBuilder.group({
    resetCode : [null, [Validators.required, Validators.pattern(/^\d{0,6}$/)]],
  });

  resetPasswordForm:FormGroup = this._FormBuilder.group({
    newPassword : [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    confirmPassword : [null],
  }, {validators : this.confirmPassword});

  verifyEmail():void{
    if(this.verifyEmailForm.valid){
      this.isLoading=true;
      this.verifyCodeSubscription = this._AuthService.verifyEmail(this.verifyEmailForm.value).subscribe({
        next:(res)=>{
          if(res.statusMsg == "success"){
            this.isLoading = false;
            this.messageErr = "";
            this.step = 2;
          }
        },error:(err)=>{
          this.isLoading = false;
          this.messageErr = err.error.message;
        }
      })
    } else{
      this.verifyEmailForm.markAllAsTouched();
    }
  }

    verifyCode():void{
    if(this.verifyCodeForm.valid){
      this.isLoading=true;
      this.verifyCodeSubscription = this._AuthService.verifyResetCode(this.verifyCodeForm.value).subscribe({
        next:(res)=>{
          if(res.status == "Success"){
            this.isLoading = false;
            this.messageErr = "";
            this.step = 3;
          }
        },error:(err)=>{
          this.isLoading = false;
          this.messageErr = err.error.message;
        }
      })
    } else{
      this.verifyCodeForm.markAllAsTouched();
    }
  }

    resetPassword():void{
    if(this.resetPasswordForm.valid){
      this.isLoading=true;
      this.resetPasswordSubscription = this._AuthService.resetPassword({...this.verifyEmailForm.value, ...this.resetPasswordForm.value}).subscribe({
        next:(res)=>{
            this._Router.navigate(['/login']);
        },error:(err)=>{
          this.isLoading = false;
          this.messageErr = err.error.message;
        }
      })
    } else{
      this.resetPasswordForm.markAllAsTouched();
    }
  }

    confirmPassword(g:AbstractControl):object | null{
    if(g.get('newPassword')?.value === g.get("confirmPassword")?.value){
      return null;
    } else{
      return {mismatch : true}
    }
  }

  enterEmailAgain():void{
    this.step = 1;
  }

  ngOnDestroy(): void {
    this.verifyEmailSubscription?.unsubscribe();
    this.verifyCodeSubscription?.unsubscribe();
    this.resetPasswordSubscription?.unsubscribe();
  }
}
