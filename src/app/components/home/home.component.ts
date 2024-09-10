import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from "../product-card/product-card.component";
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { HeadlineComponent } from "../headline/headline.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, ProductCardComponent, HeadlineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _BrandsService = inject(BrandsService);
  categories:WritableSignal<Icategory[]> = signal([]);
  brands:WritableSignal<IBrand[]> = signal([]);
  products:WritableSignal<IProduct[]> = signal([]);
  getProductsSubscription!:Subscription;
  getBrandsSubscription!:Subscription;
  getCategoriesSubscription!:Subscription;

  sliderCustomOptions:OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayHoverPause:true,
    dots: false,
    autoplay:true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    items: 1,
  }

  ngOnInit(): void {
    this.getCategoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next:(res) => {
        this.categories.set(res.data);
      }
    });
    this.getBrandsSubscription = this._BrandsService.getAllBrands().subscribe({
      next:(res) => {
        this.brands.set(res.data);
      }
    });
    this.getProductsSubscription = this._ProductsService.getLimitProducts('10').subscribe({
        next:(res) => {
          this.products.set(res.data);
        }
      })
  }

  ngOnDestroy(): void{
    this.getProductsSubscription?.unsubscribe();
    this.getCategoriesSubscription?.unsubscribe();
    this.getBrandsSubscription?.unsubscribe();
  }
}
