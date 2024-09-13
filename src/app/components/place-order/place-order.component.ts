import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IAddress } from '../../core/interfaces/iaddress';
import { AddressesService } from '../../core/services/addresses.service';
import { OrdersService } from '../../core/services/orders.service';
import { HeadlineComponent } from "../headline/headline.component";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule, HeadlineComponent],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit, OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  private readonly  _AddressesService = inject(AddressesService);
  private readonly _Router = inject(Router);
  onlinePaymentSubscription!:Subscription;
  cashPaymentSubscription!:Subscription;
  getAllAddressesSubscription!:Subscription;
  addAddressesSubscription!:Subscription;
  getIdSubscription!:Subscription;
  addresses:WritableSignal<IAddress[]> = signal([]);
  isLoading:boolean = false;
  id:string | null = null;
  step:number = 0;

  shippingAddress:FormGroup = this._FormBuilder.group({
    name : [null, [Validators.required]],
    details : [null, [Validators.required]],
    phone : [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city : [null, [Validators.required]],
  });

  ngOnInit(): void {
      this.getIdSubscription = this._ActivatedRoute.paramMap.subscribe({
        next:(res)=>{
          this.id = res.get('id');
        }
      });

      this._AddressesService.getAllAddresses().subscribe({
        next:(res)=>{
          this.step = 1;
          this.addresses.set(res.data);
        }
      })
  }

  addAddress():void{
    if(this.shippingAddress.valid){
      this.isLoading = true
      this.addAddressesSubscription = this._AddressesService.addAddress(this.shippingAddress.value).subscribe({
      next:(res)=>{
      this.isLoading = false;
      this.addresses.set(res.data);
      this.step = 1;
      this.shippingAddress.reset();
      }
    })
    }else{
      this.shippingAddress.markAllAsTouched();
    }
  }

  placeOrder(shippingAddress:IAddress):void{
      Swal.fire({
      title: "Choose Your Payment Method",
      showDenyButton: true,
      confirmButtonText: "Online Payment",
      confirmButtonColor: "#172554",
      denyButtonColor: "#172554",
      denyButtonText: "Cash On Deleviry"
    }).then((result) => {
    if (result.isConfirmed) {
      this.onlinePaymentSubscription = this._OrdersService.payWithCard(this.id!,shippingAddress).subscribe({
      next:(res)=>{
        window.open(res.session.url, '_self');
      }
      });
    } else if (result.isDenied) {
      this.cashPaymentSubscription = this._OrdersService.cashOrder(this.id!,shippingAddress).subscribe({
      next:(res)=>{
        this._Router.navigate(['/allorders'])
      }
      });
    }
});
}

  ngOnDestroy(): void {
      this.onlinePaymentSubscription?.unsubscribe();
      this.cashPaymentSubscription?.unsubscribe();
      this.getAllAddressesSubscription?.unsubscribe();
      this.addAddressesSubscription?.unsubscribe();
      this.getIdSubscription?.unsubscribe();
  }
}
