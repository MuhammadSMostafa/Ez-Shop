import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { StarsComponent } from "../stars/stars.component";
import { UpdateCartItemComponent } from "../update-cart-item/update-cart-item.component";
import { IProduct } from './../../core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, StarsComponent, AddToCartButtonComponent, UpdateCartItemComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class DetailsComponent implements OnInit, OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  public readonly _WishlistService = inject(WishlistService);
  private readonly _ProductsService = inject(ProductsService);
  productSubscription!:Subscription;
  getIdSubscription!:Subscription;
  addToWishlistSubscription!:Subscription;
  removeFromWishlistSubscription!:Subscription;
  productDetails:WritableSignal<IProduct> = signal({} as IProduct);
  id:string | null = null;
  productsId = computed(() => this._CartService.userCart().products.map((ele) => ele.product._id));
  wishlistProductsId = computed(() => this._WishlistService.wishlistIds());

  ngOnInit(): void {
    this.getIdSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.id = res.get('id');
      }
    });
    this.productSubscription = this._ProductsService.getSpecificProduct(this.id!).subscribe({
      next: (res)=>{
        this.productDetails.set(res.data);
      }
    });
  }

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
      this.productSubscription?.unsubscribe();
      this.getIdSubscription?.unsubscribe();
      this.removeFromWishlistSubscription?.unsubscribe();
      this.addToWishlistSubscription?.unsubscribe();
  }
}
