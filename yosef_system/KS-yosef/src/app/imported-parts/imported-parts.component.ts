import { Component, OnInit } from '@angular/core';
import { PartsService } from "../services/parts.service";
import { Router } from '@angular/router';
import { Imported_Parts } from '../models/imported_parts'
import { FormControl, FormGroup } from '@angular/forms';
import { CartAction } from '../store/actions/cart.actions';

declare var $:any;

@Component({
  selector: 'app-imported-parts',
  templateUrl: './imported-parts.component.html',
  styleUrls: ['./imported-parts.component.css']
})
export class ImportedPartsComponent implements OnInit {
  imported_parts : Imported_Parts
  selectedPart : Imported_Parts

  // Add to cart...
  addQuantity : Number
  available : boolean = true

  // Form Controls
  myForm : FormGroup;
  id : FormControl;
  partNumber : FormControl;
  stamp : FormControl;
  description : FormControl;
  origin : FormControl;
  price : FormControl;
  quantity : FormControl;
  remark : FormControl;
  local_cost : FormControl;
  constructor(private _partService : PartsService, private _router : Router, private _cartStore : CartAction) { }

  ngOnInit() {
    this.createControls();
    this.createEditForm();
    this.getImportedParts();
  }
  getImportedParts(){
    this._partService.getImportedParts()
    .subscribe(
      res =>{
        console.log(res)
        this.imported_parts = res
      }, err =>{
        console.log(err)
      }
    )
  }
  btn_showPartInfoClick(part: Imported_Parts){
    console.log("show repair button clicked...");
    this.selectedPart = part;
    // console.log(this.selectedPart)
    $("#modal-view").modal('show'); 
    
  }
  btn_editPartClick(part : any){
    this.selectedPart = part
    this.myForm.setValue({
      id : part._id,
      partNumber : part.partNumber,
      stamp : part.stamp,
      description : part.description,
      remark : part.remark,
      price : part.price,
      local_cost : part.local_cost,
      quantity : part.quantity,
      origin : part.origin
    });
    $("#modal-edit").modal('show');
    console.log("edit part clicked...")
  }

  createControls(){
    this.id = new FormControl();
    this.partNumber = new FormControl();
    this.stamp = new FormControl();
    this.description = new FormControl();
    this.remark = new FormControl();
    this.price = new FormControl();
    this.origin = new FormControl();
    this.local_cost = new FormControl();
    this.quantity = new FormControl();
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id : this.id,
      partNumber : this.partNumber,
      stamp : this.stamp,
      description : this.description,
      origin : this.origin,
      remark : this.remark,
      price : this.price,
      local_cost : this.local_cost,
      quantity : this.quantity
    });
  }
  saveUpdates(){
    if (this.myForm.valid){
      var data = <Imported_Parts> this.myForm.value
      this._partService.updateImported(data)
      .subscribe(res =>{
        this.selectedPart.partNumber = data.partNumber
        this.selectedPart.stamp = data.stamp
        this.selectedPart.price = data.price
        this.selectedPart.origin = data.origin
        this.selectedPart.quantity = data.quantity
        this.selectedPart.remark = data.remark
        this.selectedPart.description = data.description
        this.selectedPart.local_cost = data.local_cost
        $('#modal-edit').modal('hide')
      });      
    }
  }

  btn_addToCartClick(part: Imported_Parts){
    this.selectedPart = part;
    console.log("Add to cart clicked...")
    $("#modal-addToCart").modal('show');
  }

  addTo_cart(){
    if (this.addQuantity){
      if(this.addQuantity > this.selectedPart.quantity){
        this.available = false;
      } else {
        this.available = true;
        this._cartStore.addToCart(this.selectedPart, this.addQuantity || 1)
        this.selectedPart.quantity = Number(this.selectedPart.quantity) - Number(this.addQuantity)
        this.addQuantity = null
        $('#modal-addToCart').modal('hide');
      }
    }
  }
}
