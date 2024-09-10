import { Component, inject, input, InputSignal, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent implements OnDestroy {
  productId:InputSignal<string> = input.required();
  private readonly _CartService = inject(CartService);
  addToCartSubscription!:Subscription;
  isLoading:boolean = false;

  addToCart(id:string){
    this.isLoading = true;
    this.addToCartSubscription = this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._CartService.getCart().subscribe({
          next:(res)=>{
            this._CartService.userCart.set(res.data);
            this.isLoading = false;
          }
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.addToCartSubscription?.unsubscribe();
  }
}
