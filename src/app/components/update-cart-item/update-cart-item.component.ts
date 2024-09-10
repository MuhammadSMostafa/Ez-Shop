import { Component, inject, input, InputSignal, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-update-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './update-cart-item.component.html',
  styleUrl: './update-cart-item.component.scss'
})
export class UpdateCartItemComponent implements OnDestroy{
    item:InputSignal<any> = input.required();
    cartComponent:InputSignal<any> = input.required();
    private readonly _CartService = inject(CartService);
    updateItemSubscription!:Subscription;
    removeItemSubscription!:Subscription;
    disabledBtn:boolean = false;

    swalAlert(text:string, logic:Function):void{
    Swal.fire({
    title: "Are you sure?",
    text: `You will delete ${text}`,
    icon: "question",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
      logic();
    }
    });
  }

  removeItem(product:any):void{
    this.swalAlert(product.title, ()=>{
      this.removeItemSubscription = this._CartService.removeSpecificItem(product._id).subscribe({
      next:(res)=>{
        this._CartService.userCart.set(res.data);
        Swal.fire({
        title: "Removed!",
        text: `${product.title} removed from cart`,
        icon: "success"
    });
      }
    })
    })
  }

  updateCountItem(product:any, count:number):void{
  if(!this.disabledBtn){
    if(count === 0){
      this.removeItem(product);
    } else{
      this.disabledBtn = true;
      this.updateItemSubscription = this._CartService.updateItemCount(product.id,count).subscribe({
          next: (res)=> {
            this._CartService.userCart.set(res.data);
            this.disabledBtn = false;
          }
        })
      }
    }
}

ngOnDestroy(): void {
    this.removeItemSubscription?.unsubscribe();
    this.updateItemSubscription?.unsubscribe();
}
}
