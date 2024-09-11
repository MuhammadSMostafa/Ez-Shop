import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { HeadlineComponent } from "../headline/headline.component";
import { NoDataComponent } from "../no-data/no-data.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { IProduct } from './../../core/interfaces/iproduct';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent, HeadlineComponent, NoDataComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  public readonly _WishlistService = inject(WishlistService);
  wishlistProducts:WritableSignal<IProduct[] | null> = signal(null);

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next:(res)=>{
        this.wishlistProducts.set(res.data);
      }
    })
  }
}
