import { Component, computed, inject, input, InputSignal, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { StarsComponent } from "../stars/stars.component";
import { UpdateCartItemComponent } from "../update-cart-item/update-cart-item.component";
import { CartService } from './../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, StarsComponent, TrimTextPipe, AddToCartButtonComponent, UpdateCartItemComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnDestroy{
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  addToWishlistSubscription!:Subscription;
  removeFromWishlistSubscription!:Subscription;
  product:InputSignal<IProduct> = input.required();
  productsId = computed(() => this._CartService.userCart().products?.map((ele) => ele.product._id));
  wishlistProductsId = computed(() => this._WishlistService.wishlistIds());

  getProduct(id: string) {
  const product = this._CartService.userCart().products.find((ele) => ele.product._id === id);
  if (product) {
    return product;
  } else {
    return null;
  }
  }

  addToWishlist(id:string){
    this.addToWishlistSubscription = this._WishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        this._WishlistService.wishlistIds.set(res.data);
      }
    })
  }

  removeFromWishlist(id:string){
    this.removeFromWishlistSubscription = this._WishlistService.removeFromtWishlist(id).subscribe({
      next:(res)=>{
        this._WishlistService.wishlistIds.set(res.data);
      }
    })
  }

  ngOnDestroy(): void {
      this.addToWishlistSubscription?.unsubscribe();
      this.removeFromWishlistSubscription?.unsubscribe();
  }
}
