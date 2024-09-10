import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { HeadlineComponent } from "../headline/headline.component";
import { NoDataComponent } from "../no-data/no-data.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { IProduct } from './../../core/interfaces/iproduct';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, HeadlineComponent, NoDataComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);
  categorySubscription!:Subscription;
  getProductsSubscription!:Subscription;
  getIdSubscription!:Subscription;
  categoryDetails:WritableSignal<Icategory> = signal({} as Icategory);
  products:WritableSignal<IProduct[]> = signal([]);
  noData:boolean = false;
  id:string | null = null;

  ngOnInit(): void {
   this.getIdSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.id = res.get('id');
      }
    });

    this.categorySubscription = this._CategoriesService.getSpecificCategory(this.id!).subscribe({
      next: (res)=>{
        this.categoryDetails.set(res.data);
      }
    });

    this.getProductsSubscription = this._ProductsService.getCategoryProducts(this.id!).subscribe({
      next:(res) => {
        this.products.set(res.data);
        if(this.products().length === 0){
          this.noData = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.getProductsSubscription?.unsubscribe();
    this.getIdSubscription?.unsubscribe();
  }
}
