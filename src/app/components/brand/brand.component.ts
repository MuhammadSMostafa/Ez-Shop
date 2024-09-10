import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/ibrand';
import { IProduct } from '../../core/interfaces/iproduct';
import { BrandsService } from '../../core/services/brands.service';
import { ProductsService } from '../../core/services/products.service';
import { NoDataComponent } from "../no-data/no-data.component";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [ProductCardComponent, NoDataComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit, OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ProductsService = inject(ProductsService);
  brandSubscription!:Subscription;
  getProductsSubscription!:Subscription;
  brandDetails:WritableSignal<IBrand> = signal({} as IBrand);
  products:WritableSignal<IProduct[]> = signal([]);
  id:string | null = null;
  noData:boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.id = res.get('id');
      }
    });

    this.brandSubscription = this._BrandsService.getSpecificBrand(this.id!).subscribe({
          next: (res)=>{
            this.brandDetails.set(res.data);
          }
        });

    this.getProductsSubscription = this._ProductsService.getBrandProducts(this.id!).subscribe({
      next:(res) => {
        this.products.set(res.data);
        if(this.products().length === 0){
          this.noData = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
      this.brandSubscription?.unsubscribe();
      this.getProductsSubscription?.unsubscribe();
  }
}
