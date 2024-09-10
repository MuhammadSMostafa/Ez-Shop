import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  registerSubscribtion!:Subscription;
  messageErr:string = "";
  isLoading:boolean = false;
  mssSuccess:boolean = false;

  registerForm:FormGroup = this._FormBuilder.group({
    name : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email : [null, [Validators.required, Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/)]],
    phone : [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password : [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword : [null],
  }, {validators : this.confirmPassword});

  register():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSubscribtion = this._AuthService.register(this.registerForm.value).subscribe({
      next: (res)=>{
          if(res.message == "success"){
            this.messageErr = "";
            this.mssSuccess = true;
            this.isLoading = false;
            this._ToastrService.success('Register Success');
            this._Router.navigate(['/login']);
          }
      },
      error: (err:HttpErrorResponse)=>{
        this.isLoading = false;
        this.messageErr = err.error.message;
      }
    })
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(g:AbstractControl):object | null{
    if(g.get('password')?.value === g.get("rePassword")?.value){
      return null;
    } else{
      return {mismatch : true}
    }
  }

  ngOnDestroy(): void {
    this.registerSubscribtion?.unsubscribe();
  }
}
