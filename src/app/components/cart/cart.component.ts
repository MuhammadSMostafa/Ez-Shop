import { Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ICart } from '../../core/interfaces/icart';
import { CartService } from '../../core/services/cart.service';
import { NoDataComponent } from "../no-data/no-data.component";
import { UpdateCartItemComponent } from "../update-cart-item/update-cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, UpdateCartItemComponent, NoDataComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy{
  private readonly _CartService = inject(CartService);
  deleteCartSubscription!:Subscription;
  userCart = computed(()=> this._CartService.userCart());

  deleteCart():void{
    Swal.fire({
    title: "Are you sure?",
    text: `You will delete all cart`,
    icon: "question",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
      this.deleteCartSubscription = this._CartService.deleteCart().subscribe({
      next: ()=>{
      this._CartService.userCart.set({} as ICart)
      Swal.fire({
        title: "Deleted!",
        text: "All products removed from cart",
        icon: "success"
      });
    }}
  )}
});
}

  ngOnDestroy(): void {
    this.deleteCartSubscription?.unsubscribe();
  }
}
