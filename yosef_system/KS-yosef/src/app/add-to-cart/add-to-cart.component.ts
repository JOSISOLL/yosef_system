import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { CartAction } from '../store/actions/cart.actions'
import { Subscription } from 'rxjs/Subscription';
import { Sell } from '../models/sell';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';

declare var  jquery: any; 
declare var $:any;

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
  public sell : Sell = {}; 
  public sellDate : String;

  //Checkout customer information

  checkoutForm : FormGroup

  buyerName : FormControl
  buyerPhoneNumber : FormControl
  buyerTinNumber : FormControl
  personInCharge : FormControl
  date : FormControl




  constructor(private _partService : PartsService, private _cartStore : CartAction, private _router: Router ) { }
  
  createControls(){
    this.buyerName = new FormControl();
    this.buyerPhoneNumber = new FormControl();
    this.buyerTinNumber = new FormControl();
    this.personInCharge = new FormControl();
    this.date = new FormControl();

  }
  createForm(){
    this.checkoutForm = new FormGroup({
      buyerName : this.buyerName,
      buyerPhoneNumber : this.buyerPhoneNumber,
      buyerTinNumber: this.buyerTinNumber,
      personInCharge : this.personInCharge,
      date : this.date
    })
  }
  
  removeProduct(product) {
    this._cartStore.removeFromCart(product)
  }
  checkout() {
    alert('Sorry! Checkout will be coming soon!')
  }
  buy(cart: any[]){
    console.log("Checkout button clicked...");
    $("#modal-checkout").modal('show');
  }
  onSubmit(cart : any[]){
    if(this.checkoutForm.valid){
      var data = this.checkoutForm.value;
      console.log("Form is VALID")
      console.log(data, cart)
      this.sell.buyerName = data.buyerName;
      this.sell.buyerPhoneNumber = data.buyerPhoneNumber
      this.sell.buyerTinNumber = data.buyerTinNumber;
      this.sell.grandTotal = this.totalPrice;
      this.sell.quantity = this.totalQuantity;
      this.sell.personInCharge = data.personInCharge;
      this.sell.parts = cart;
      this.sell.date = data.date;
      console.log(this.sell)
      
      this._partService.sell(this.sell) 
      .subscribe(
        res => {
          // console.log("Response from server...");
          // console.log(res);
          // console.log("Items successfully sold!")
          // this.cartSubscription.unsubscribe(); 
          alert('Items sold successfully!');
          this.cart.length = 0;
          this.ngOnDestroy();
          this.ngOnInit();
          this._router.navigate(['/parts/stock'])
          $("#modal-checkout").modal('hide');
        },
        err => {
          console.log(err);
        }
      )
    }

  }

  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.forEach((item, i) => {
      // console.log(item)
      intPrice = parseFloat(item.price)
      // console.log(intPrice, item.price);
      intQuantity = parseInt(item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity)
      // console.log(totalCost)
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
      console.log(res.products)
      this.getTotalPrice()
    })
    this.createControls(); 
    this.createForm();
    this.sellDate= new Date().toLocaleString();
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }

}
