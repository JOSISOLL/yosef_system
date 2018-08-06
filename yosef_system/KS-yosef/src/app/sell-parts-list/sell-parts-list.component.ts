import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sell } from '../models/sell';
import { Parts } from '../models/parts';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $:any;

 
@Component({
  selector: 'app-sell-parts-list',
  templateUrl: './sell-parts-list.component.html',
  styleUrls: ['./sell-parts-list.component.css']
})
export class SellPartsListComponent implements OnInit {

  sold : Sell [];
  parts : Parts [];
  selected : Sell
  myForm : FormGroup;
  id : FormControl;
  buyerName : FormControl;
  buyerPhoneNumber : FormControl;
  // sellId : FormControl;
  buyerTinNumber : FormControl;
  personInCharge : FormControl;

  constructor(private _partsService : PartsService, private _router : Router) { }

  ngOnInit() {
    this.getSoldItems();
    this.createControls();
    this.createEditForm();
    
  }
  getSoldItems(){
    this._partsService.getPartsSold()
    .subscribe(
      res =>{
        this.sold = res;
        console.log(this.sold);
      },
      err =>{
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  btn_showSoldInfoClick(sold : Sell){
    console.log("Show sold items button clicked...");
    this.selected = sold;
    this.parts = sold.parts;
    console.log(this.selected);
    $("#modal-view").modal('show');
  }
  btn_editSellClick(sold : any){
    this.selected = sold;
    console.log(this.selected);
    this.myForm.setValue({
      id : sold._id,
      // sellId : sold.sellId,
      buyerName : sold.buyerName,
      buyerPhoneNumber : sold.buyerPhoneNumber,
      buyerTinNumber : sold.buyerTinNumber,
      personInCharge : sold.personInCharge
    });
    $("#modal-edit").modal('show');
    console.log("Edit button clicked....");
  }
  createControls(){
    this.id = new FormControl();
    // this.sellId = new FormControl();
    this.buyerName = new FormControl();
    this.buyerPhoneNumber = new FormControl();
    this.buyerTinNumber = new FormControl();
    this.personInCharge = new FormControl();
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id : this.id,
      // sellId : this.sellId,
      buyerName : this.buyerName,
      buyerPhoneNumber : this.buyerPhoneNumber,
      buyerTinNumber : this.buyerTinNumber,
      personInCharge : this.personInCharge
    });
  }
  saveUpdates(){
    if(this.myForm.valid){
      var data = <any> this.myForm.value;
      console.log("Form update data...");
      console.log(data);

    }
  }
  
  
  

}
