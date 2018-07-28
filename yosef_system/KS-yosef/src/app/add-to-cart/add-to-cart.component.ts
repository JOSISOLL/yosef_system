import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { CartAction } from '../store/actions/cart.actions'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(private _partService : PartsService, private _cartStore : CartAction ) { }
  removeProduct(product) {
    this._cartStore.removeFromCart(product)
  }
  checkout() {
    alert('Sorry! Checkout will be coming soon!')
  }

  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.price)
      intQuantity = parseInt(item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity)
      // console.log(item)
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
  }
  ngOnInit() {
    this.cartSubscription = this._cartStore.getState().subscribe(res => {
      this.cart = res.products
      this.getTotalPrice()
    })
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }

}
