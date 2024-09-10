import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { ISubcategory } from '../../core/interfaces/isubcategory';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy{
  private readonly _CategoriesService = inject(CategoriesService);
  categories:WritableSignal<Icategory[]> = signal([]);
  getCategoriesSubscription!:Subscription;
  getSubCategoriesSubscription!:Subscription;
  subCategories:WritableSignal<ISubcategory[]> = signal([]);


  getSubCategories(page:string):void{
          this._CategoriesService.getAllSubCategories(page).subscribe({
        next:(res)=>{
          this.subCategories.update(currentArray => {
            return [...currentArray, ...res.data];
          });
          if(res.metadata.currentPage != res.metadata.numberOfPages){
            this.getSubCategories(res.metadata.nextPage);
          }
        }
      })
  }

  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categories.set(res.data);
        }
      });
      this.getSubCategories('1');
  }

  ngOnDestroy(): void {
      this.getCategoriesSubscription.unsubscribe();
      this.getSubCategoriesSubscription.unsubscribe();
  }
}
