<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { CartAction } from '../store/actions/cart.actions'
import { Subscription } from 'rxjs/Subscription';
import { Sell } from '../models/sell';
import { Distribute } from '../models/distribute'
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { ToastrService } from 'ngx-toastr';
=======
import { Component, OnInit } from "@angular/core";
import { PartsService } from "../services/parts.service";
import { CartAction } from "../store/actions/cart.actions";
import { Subscription } from "rxjs/Subscription";
import { Sell } from "../models/sell";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "../../../node_modules/@angular/forms";
>>>>>>> add-excel-import

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.css"]
})
export class AddToCartComponent implements OnInit {
  public cart = [];
  public distCheck : boolean ;
  public totalPrice: number;
  public totalQuantity: number;
  public grandTotal: number;
  public taxbl: number;
  public cartSubscription: Subscription;
<<<<<<< HEAD
  public sell : Sell = {};
  public distribute : Distribute = {} 
  public sellDate : String;

  //Checkout customer information

  checkoutForm : FormGroup
  
  buyerName : FormControl
  buyerPhoneNumber : FormControl
  buyerTinNumber : FormControl
  personInCharge : FormControl
  date : FormControl

  // Check if it's distribute or Sell
  public onDistribute(value:boolean){
    this.distCheck = value;
    console.log(this.distCheck)
  }
=======
  public sell: Sell = {};
  public sellDate: String;

  //Checkout customer information

  checkoutForm: FormGroup;

  buyerName: FormControl;
  buyerPhoneNumber: FormControl;
  buyerTinNumber: FormControl;
  personInCharge: FormControl;
  date: FormControl;
>>>>>>> add-excel-import

  constructor(
    private _partService: PartsService,
    private _cartStore: CartAction,
    private _router: Router
  ) {}

<<<<<<< HEAD
  constructor(private _toast : ToastrService, private _partService : PartsService, private _cartStore : CartAction, private _router: Router ) { }
  
  createControls(){
    
=======
  createControls() {
>>>>>>> add-excel-import
    this.buyerName = new FormControl();
    this.buyerPhoneNumber = new FormControl();
    this.buyerTinNumber = new FormControl();
    this.personInCharge = new FormControl();
    this.date = new FormControl();
  }
  createForm() {
    this.checkoutForm = new FormGroup({
      buyerName: this.buyerName,
      buyerPhoneNumber: this.buyerPhoneNumber,
      buyerTinNumber: this.buyerTinNumber,
      personInCharge: this.personInCharge,
      date: this.date
    });
  }

  removeProduct(product) {
<<<<<<< HEAD
    this._cartStore.removeFromCart(product)
    this._toast.warning("Item Removed from Cart", "Removed!");
=======
    this._cartStore.removeFromCart(product);
>>>>>>> add-excel-import
  }
  checkout() {
    alert("Sorry! Checkout will be coming soon!");
  }
  buy(cart: any[]) {
    $("#modal-checkout").modal("show");
  }
  onSubmit(cart: any[]) {
    if (this.checkoutForm.valid) {
      var data = this.checkoutForm.value;
<<<<<<< HEAD
      console.log("Form is VALID")
      console.log(data, cart)
      if(this.distCheck){
        this.distribute.buyerName = data.buyerName;
        this.distribute.buyerPhoneNumber = data.buyerPhoneNumber;
        this.distribute.buyerTinNumber = data.buyerTinNumber;
        this.distribute.grandTotal = this.grandTotal;
        this.distribute.subTotal = this.totalPrice;
        this.distribute.personInCharge = data.personInCharge;
        this.distribute.parts = cart;
        this.distribute.quantity = this.totalQuantity;
        this.distribute.date = data.date;
        console.log("Parts ready for distribute .....")
        console.log(this.distribute)

        this._partService.distribute(this.distribute)
        .subscribe(
          res => {
            // alert('Items distributed successfully!');
            this._toast.success("Items Distributed Successfully", "Success")
            this.cart.length = 0;
            this.ngOnDestroy();
            this.ngOnInit();
            this._router.navigate(['/distribute'])
            $("#modal-checkout").modal('hide');
          },
          err => {
            console.log(err);
            this._toast.error(err)
          })
      } 
      else 
      {
        this.sell.buyerName = data.buyerName;
        this.sell.buyerPhoneNumber = data.buyerPhoneNumber
        this.sell.buyerTinNumber = data.buyerTinNumber;
        this.sell.grandTotal = this.grandTotal;
        this.sell.subTotal = this.totalPrice;
        this.sell.quantity = this.totalQuantity;
        this.sell.personInCharge = data.personInCharge;
        this.sell.parts = cart;
        this.sell.date = data.date;
        console.log("Parts ready to be sold")
        
        this._partService.sell(this.sell) 
        .subscribe(
          res => {
            // alert('Items sold successfully!');
            this._toast.success("Items Sold Successfully", "Success")
            this.cart.length = 0;
            this.ngOnDestroy();
            this.ngOnInit();
            this._router.navigate(['/parts/stock'])
            $("#modal-checkout").modal('hide');
          },
          err => {
            console.log(err);
            this._toast.error(err)
          })
      }
=======
      this.sell.buyerName = data.buyerName;
      this.sell.buyerPhoneNumber = data.buyerPhoneNumber;
      this.sell.buyerTinNumber = data.buyerTinNumber;
      this.sell.grandTotal = this.grandTotal;
      this.sell.subTotal = this.totalPrice;
      this.sell.quantity = this.totalQuantity;
      this.sell.personInCharge = data.personInCharge;
      this.sell.parts = cart;
      this.sell.date = data.date;

      this._partService.sell(this.sell).subscribe(
        res => {
          alert("Items sold successfully!");
          this.cart.length = 0;
          this.ngOnDestroy();
          this.ngOnInit();
          this._router.navigate(["/parts/stock"]);
          $("#modal-checkout").modal("hide");
        },
        err => {
          console.log(err);
        }
      );
>>>>>>> add-excel-import
    }
  }

  getTotalPrice() {
    let totalCost: Array<number> = [];
    let quantity: Array<number> = [];
    let intPrice: number;
    let intQuantity: number;
    this.cart.forEach((item, i) => {
<<<<<<< HEAD
      // console.log(item)
      intPrice = parseFloat(item.price)
      intQuantity = parseInt(item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity)
    })
=======
      intPrice = parseFloat(item.price);
      intQuantity = parseInt(item.quantity);
      totalCost.push(intPrice);
      quantity.push(intQuantity);
    });
>>>>>>> add-excel-import

    this.totalPrice = totalCost.reduce((acc, item) => {
      return (acc += item);
    }, 0);
    this.totalQuantity = quantity.reduce((acc, item) => {
      return (acc += item);
    }, 0);

    this.taxbl = this.totalPrice * 0.15;
    this.grandTotal = this.totalPrice + this.taxbl;
  }
  ngOnInit() {
    this.cartSubscription = this._cartStore.getState().subscribe(res => {
      this.cart = res.products;
      this.getTotalPrice();
    });
    this.createControls();
    this.createForm();
    this.sellDate = new Date().toLocaleString();
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
