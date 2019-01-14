import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Parts } from '../models/parts';
import { CartAction } from "../store/actions/cart.actions"
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var  jquery: any; 
declare var $:any;

@Component({
  selector: 'app-parts-stock',
  templateUrl: './parts-stock.component.html',
  styleUrls: ['./parts-stock.component.css']
})
export class PartsStockComponent implements OnInit {

  parts :Parts []
  addQuantity : number
  available : boolean = true
  selectedPart : Parts
  
  myForm : FormGroup;
  id : FormControl;
  itemPId : FormControl;
  partNumber : FormControl;
  stamp : FormControl;
  description : FormControl;
  supplier : FormControl;
  price : FormControl;
  quantity : FormControl;
  shelfNumber : FormControl;
  purchaseDate : FormControl;


  constructor(private _partsService : PartsService, private _router : Router, private _cartStore : CartAction) {
    
   }

  ngOnInit() {
    this.createControls(); 
    this.createEditForm(); 
    this.getStock();
  }
  getStock(){
    this._partsService.getStock()
    .subscribe(
      
      res => {
        this.parts = res;
        console.log(this.parts)
      },

      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
  
  btn_showPartInfoClick(part: Parts){
    console.log("show repair button clicked...");
    this.selectedPart =part;
    // console.log(this.selectedPart)
    $("#modal-view").modal('show'); 
    
  }
  btn_editPartClick(part: any){
    this.selectedPart = part;
    // console.log(this.selectedPart) 
    this.myForm.setValue({
      id: part._id,
      itemPId : part.itemPId,
      partNumber : part.partNumber,
      stamp : part.stamp,
      description : part.description,
      supplier : part.supplier,
      price : part.price,
      quantity : part.quantity,
      shelfNumber : part.shelfNumber,
      purchaseDate : part.purchaseDate
    });
    $("#modal-edit").modal('show'); 
    console.log("edit repair clicked...");
  }

  createControls(){
    this.id = new FormControl();
    this.itemPId = new FormControl();
    this.partNumber = new FormControl();
    this.stamp = new FormControl();
    this.description = new FormControl();
    this.supplier = new FormControl();
    this.price = new FormControl();
    this.quantity = new FormControl();
    this.shelfNumber = new FormControl();
    this.purchaseDate = new FormControl();
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id : this.id,
      itemPId : this.itemPId,
      partNumber : this.partNumber,
      stamp : this.stamp,
      description : this.description,
      supplier : this.supplier,
      price : this.price,
      quantity : this.quantity,
      shelfNumber : this.shelfNumber,
      purchaseDate : this.purchaseDate


    });
  }
  saveUpdates(){
    if(this.myForm.valid){
      var data = <Parts> this.myForm.value; 
      console.log('form data..');
      // console.log(data);
      this._partsService.updateStock(data)
      .subscribe(res =>{
        this.selectedPart.partNumber = data.partNumber;
        this.selectedPart.stamp = data.stamp;
        this.selectedPart.description = data.description;
        this.selectedPart.supplier = data.supplier;
        this.selectedPart.price = data.price;
        this.selectedPart.quantity = data.quantity;
        this.selectedPart.shelfNumber = data.shelfNumber;
        this.selectedPart.purchaseDate = data.purchaseDate;
        $('#modal-edit').modal('hide')
      });
    }
  }
  btn_addToCartClick(part: Parts){
    this.selectedPart = part;
    console.log("Add to cart clicked...")
    $("#modal-addToCart").modal('show');
    
  }
  addTo_cart(){
    console.log(this.addQuantity)
    console.log(this.selectedPart)
    if(this.addQuantity){
      if(this.addQuantity > this.selectedPart.quantity){
        this.available = false;
      } 
      else{
        this.available = true;
        this._cartStore.addToCart(this.selectedPart, this.addQuantity || 1)
        this.selectedPart.quantity = this.selectedPart.quantity - this.addQuantity
        // console.log(this.selectedPart)
        $('#modal-addToCart').modal('hide');
      }
    }
    // console.log(this.selectedPart)

    // console.log(this.selectedPart)
  }
  btn_deletePartClick(part: Parts){
    this.selectedPart = part;
    console.log("delete part clicked...");
    // $("#modal-delete").modal('show');
    $("#modal-delete").modal('show'); 
  }
  deletePart(){
    console.log("I'm about to delete " + this.selectedPart)
    this._partsService.deleteStock(this.selectedPart)
    .subscribe(res => {
      console.log("Delete Successful!");
      $('#modal-delete').modal('hide');
      // this._router.navigate(['/parts/stock'])
      // location.reload()
      this.ngOnInit()
    })
  }
}
