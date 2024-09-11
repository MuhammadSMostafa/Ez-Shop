import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMetadata } from '../../core/interfaces/imetadata';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule, ProductCardComponent, NgClass, NoDataComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit,OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  products:WritableSignal<IProduct[]> = signal([]);
  numberOfPages:WritableSignal<number[]> = signal([]);
  metaData:IMetadata | null = null;
  getProductsSubscription!:Subscription;
  searchText:string="";

  ngOnInit(): void {
    this.getProductsSubscription = this._ProductsService.getAllProducts().subscribe({
        next:(res) => {
          this.products.set(res.data);
          this.metaData = res.metadata;
          for (let index = 1; index <= this.metaData?.numberOfPages!; index++) {
            this.numberOfPages().push(index);
          }
        }
      })
  }

  pagination(page:number):void{
    this._ProductsService.getSpecificProductsPage(page).subscribe({
      next:(res)=>{
        window.scrollTo(0, 0);
        this.products.set(res.data);
        this.metaData = res.metadata;
      }
    })
  }

  ngOnDestroy(): void{
    this.getProductsSubscription?.unsubscribe();
  }
}
