import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Parts } from "../models/parts";
import { Purchase } from "../models/purchase";
import { PartsService } from "../services/parts.service";
import { Router } from "@angular/router"
import { Suplier } from '../models/suplier';
import { SuplierService } from '../services/suplier.service';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase-parts',
  templateUrl: './purchase-parts.component.html',
  styleUrls: ['./purchase-parts.component.css']
})
export class PurchasePartsComponent implements OnInit {

  supliers: Suplier[];
  parts : Parts[] = [

  ];
  purchase : Purchase = {};
  editing : boolean;
  count: number;
  saved : boolean; 
  grandTotal: number;

  // partsForm: FormGroup;
  
  // invoiceId: FormControl;
  // partNumber: FormControl; 
  // stamp: FormControl; 
  // description: FormControl;
  // supplier: FormControl;
  // price: FormControl;
  // quantity: FormControl;
  // shelfNumber: FormControl;
  // purchaseDate: FormControl;

  constructor(private _partsService: PartsService, private _router: Router,private _suplerServie: SuplierService) { }

  invoice_id : Number;
  date : String;
  // createControls(){
  //   this.invoiceId = new FormControl('', Validators.required);
  //   this.partNumber = new FormControl('', Validators.required);
  //   this.stamp = new FormControl('', Validators.required);
  //   this.supplier = new FormControl('', Validators.required);
  //   this.description = new FormControl();
  //   this.price = new FormControl();
  //   this.quantity = new FormControl('', Validators.required);
  //   this.shelfNumber = new FormControl();
  //   this.purchaseDate = new FormControl('', Validators.required);
  // }

  // createForm(){
  //   this.partsForm = new FormGroup({
  //     invoiceId: this.invoiceId,
  //     partNumber: this.partNumber,
  //     stamp: this.stamp,
  //     description: this.description,
  //     supplier: this.supplier,
  //     price: this.price,
  //     quantity: this.quantity,
  //     shelfNumber: this.shelfNumber,
  //     purchaseDate: this.purchaseDate

  //   })
  // }
  ngOnInit() {
    this.invoice_id = this.randomInt(10000,20000)
    this.date= new Date().toLocaleString();
    this.editing = false;
    this.count = 0;
    this.grandTotal = 0;
    this.saved = false

    // this.createControls();
    // this.createForm();
    this.getAllSupliers();


  }
  // onSubmit(){
  //   if(this.partsForm.valid){
  //     console.log("Form is valid")
  //     var data = <Parts>this.partsForm.value;
  //     console.log(this.partsForm.value)
  //     this._partsService.purchase(data)
  //     .subscribe(
  //       res => {
  //         console.log("Part number " + res.partNumber + " successfully purchased and added to the stock.")
  //         this._router.navigate(['/parts/purchase'])
  //       },
  //       err => console.log(err)
  //     )

  //   } else {
  //     console.log("Form is INVALID")
  //   }
    
  // }
onSubmit(partsForm : NgForm){
    // console.log(partsForm.value)
    console.log(partsForm.valid)
    if(!partsForm.valid){
      console.log("FORM INVALID")
      // partsForm.reset()
      // this.editing = true
    } else {
      this.editing = false;
      this.parts[this.count - 1] = {
        itemPId: this.count - 1, 
        partNumber: partsForm.value.partNumber,
        stamp: partsForm.value.partNumber,
        quantity: partsForm.value.quantity,
        description: partsForm.value.description,
        supplier: partsForm.value.supplier,
        price: partsForm.value.price,
        shelfNumber: partsForm.value.shelfNumber,
        purchaseDate: partsForm.value.purchaseDate 
      }
      this.grandTotal += partsForm.value.quantity * partsForm.value.price
      partsForm.reset()
    }
}
Submit(parts : Parts[]){
  // console.log(this.invoice_id)
  this.purchase.purchaseId = this.invoice_id;
  this.purchase.parts = parts
  this.purchase.grandTotal = this.grandTotal
  
  // console.log(this.purchase)
  for(let data of this.purchase.parts){
    console.log(data)
    this._partsService.partsStock(data)
    .subscribe (
      res => {
        console.log(res);
      },
      err => {
        console.log(err)
      })
  }
  this._partsService.purchase(this.purchase)
  .subscribe(
    res => {
      console.log(res);
      this.saved = true
      this._router.navigate(['/parts/purchase'])
    },
    err => {
      console.log(err)
    }
  )
}

randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
 }
getAllSupliers(){
  this._suplerServie.getSupliers().subscribe(
    res => this.supliers = res, 
      err => {
      if (err instanceof HttpErrorResponse){
        if (err.status === 401){
          this._router.navigate(['/login']);
        }
      }
    }
  )
}
addItem($event){
  console.log("Add Item clicked")
  this.count += 1
  this.editing = true;
  this.parts.push({
    itemPId: this.count,
    partNumber: "null",
    stamp: "null",
    quantity: -1,
    description: "null",
    supplier: "",
    price: -1,
    shelfNumber: "null",
    purchaseDate: "null"
  })
}
revert() {  // reject key of form
  this.parts.splice(this.count - 1, 1);
  this.count -= 1;
  this.editing = false;
}
print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  popupWin.document.open();
  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
  popupWin.document.close();
}


}
