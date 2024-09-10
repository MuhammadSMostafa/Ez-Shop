import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent{
  public readonly _AuthService = inject(AuthService);
  public readonly _Router = inject(Router);
  public readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  cartCount = computed(()=> this._CartService.userCart().products);
  wishlistCount = computed(()=> this._WishlistService.wishlistIds());
  isNavbarOpen = false;
  isDropdowmOpen = false;

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown(): void {
    this.isDropdowmOpen = !this.isDropdowmOpen;
  }

  ngOnInit(): void {
      this._Router.events.subscribe((event)=>{
        if (event instanceof NavigationEnd) {
        this.isDropdowmOpen = false;
        this.isNavbarOpen = false;
      }
      });
    }
}
