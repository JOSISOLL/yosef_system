import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Parts } from "../models/parts";
import { PartsService } from "../services/parts.service";
import { Router } from "@angular/router"
import { Suplier } from '../models/suplier';
import { SuplierService } from '../services/suplier.service';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-purchase-parts',
  templateUrl: './purchase-parts.component.html',
  styleUrls: ['./purchase-parts.component.css']
})
export class PurchasePartsComponent implements OnInit {

  supliers: Suplier[];

  partsForm: FormGroup;
  
  invoiceId: FormControl;
  partNumber: FormControl; 
  stamp: FormControl; 
  description: FormControl;
  supplier: FormControl;
  buyPrice: FormControl;
  quantity: FormControl;
  sellPrice: FormControl;
  remark: FormControl;
  make: FormControl;
  shelfNumber: FormControl;
  purchaseDate: FormControl;

  constructor(private _partsService: PartsService, private _router: Router,private _suplerServie: SuplierService) { }

  invoice_id : Number;
  date : String;
  createControls(){
    this.invoiceId = new FormControl('', Validators.required);
    this.partNumber = new FormControl('', Validators.required);
    this.stamp = new FormControl('', Validators.required);
    this.supplier = new FormControl('', Validators.required);
    this.description = new FormControl();
    this.buyPrice = new FormControl();
    this.quantity = new FormControl('', Validators.required);
    this.sellPrice = new FormControl();
    this.remark = new FormControl('', Validators.required);
    this.make = new FormControl();
    this.shelfNumber = new FormControl();
    this.purchaseDate = new FormControl('', Validators.required);
  }

  createForm(){
    this.partsForm = new FormGroup({
      invoiceId: this.invoiceId,
      partNumber: this.partNumber,
      stamp: this.stamp,
      description: this.description,
      supplier: this.supplier,
      buyPrice: this.buyPrice,
      quantity: this.quantity,
      sellPrice: this.sellPrice,
      remark: this.remark,
      make: this.make,
      shelfNumber: this.shelfNumber,
      purchaseDate: this.purchaseDate

    })
  }
  ngOnInit() {
    this.invoice_id = this.randomInt(10000,20000)
    // console.log(this.invoice_id)
    this.date= new Date().toLocaleString();
    // console.log(this.date)
    this.createControls();
    this.createForm();
    this.getAllSupliers();


  }
  onSubmit(){
    if(this.partsForm.valid){
      console.log("Form is valid")
      var data = <Parts>this.partsForm.value;
      console.log(this.partsForm.value)
      this._partsService.purchase(data)
      .subscribe(
        res => {
          console.log("Part number " + res.partNumber + " successfully purchased and added to the stock.")
          this._router.navigate(['/parts/purchase'])
        },
        err => console.log(err)
      )

    } else {
      console.log("Form is INVALID")
    }
    
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

}
