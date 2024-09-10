import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder } from '../../core/interfaces/iorder';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { HeadlineComponent } from "../headline/headline.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, HeadlineComponent, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy{
  private readonly _CartService = inject(CartService);
  private readonly _OrdersService = inject(OrdersService);
  getOrderSubscription!:Subscription;
  orders:WritableSignal<IOrder[]> = signal([]);
  noData:boolean = false;

  ngOnInit(): void {
    this._OrdersService.getOrders().subscribe({
      next:(res) => {
          this.orders.set(res.reverse());
          if(this.orders().length === 0){
            this.noData = true;
          }
      }
    })
    this._CartService.getCart().subscribe({
      next:(res)=>{
        this._CartService.userCart.set(res.data);
      }
    })
  }

  ngOnDestroy(): void {
      this.getOrderSubscription?.unsubscribe();
  }
}
