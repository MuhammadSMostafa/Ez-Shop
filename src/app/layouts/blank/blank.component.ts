import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent implements OnInit, OnDestroy{
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  getCartSubscription!:Subscription;
  getWishlistSubscription!:Subscription;

  ngOnInit(): void {
    this._AuthService.saveUserData();

    this.getCartSubscription = this._CartService.getCart().subscribe({
      next:(res)=>{
        this._CartService.userCart.set(res.data);
      }
    })
    this.getWishlistSubscription = this._WishlistService.getWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.wishlistIds.set(res.data.map((ele:any) => ele._id));
      }
    })
  }

  ngOnDestroy(): void {
      this.getCartSubscription?.unsubscribe();
      this.getWishlistSubscription?.unsubscribe();
  }
}
