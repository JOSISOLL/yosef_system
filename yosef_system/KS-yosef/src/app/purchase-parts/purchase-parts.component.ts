import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Parts } from "../models/parts";
import { Purchase } from "../models/purchase";
import { PartsService } from "../services/parts.service";
import { Router } from "@angular/router";
import { Suplier } from "../models/suplier";
import { SuplierService } from "../services/suplier.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-purchase-parts",
  templateUrl: "./purchase-parts.component.html",
  styleUrls: ["./purchase-parts.component.css"]
})
export class PurchasePartsComponent implements OnInit {
  supliers: Suplier[];
  parts: Parts[] = [];
  purchase: Purchase = {};
  editing: boolean;
  count: number;
  saved: boolean;
  grandTotal: number;
  subTotal: number;
  tax: number;
  taxbl: number;
  today: String;

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

  constructor(
    private _partsService: PartsService,
    private _router: Router,
    private _suplerServie: SuplierService
  ) {}

  invoice_id: Number;
  date: String;
  ngOnInit() {
    this.invoice_id = this.randomInt(10000, 20000);
    this.date = new Date().toLocaleString();
    this.editing = false;
    this.count = 0;
    this.grandTotal = 0;
    this.subTotal = 0;
    this.tax = 0.15;
    this.taxbl = 0;
    this.saved = false;
    this.today = new Date().toLocaleString();
    // this.createControls();
    // this.createForm();
    this.getAllSupliers();
  }
  onSubmit(partsForm: NgForm) {
    if (!partsForm.valid) {
      // partsForm.reset()
      // this.editing = true
    } else {
      this.editing = false;
      this.parts[this.count - 1] = {
        itemPId: this.count - 1,
        partNumber: partsForm.value.partNumber,
        stamp: partsForm.value.stamp,
        quantity: partsForm.value.quantity,
        description: partsForm.value.description,
        remark: partsForm.value.remark,
        supplier: partsForm.value.supplier,
        price: partsForm.value.price,
        shelfNumber: partsForm.value.shelfNumber,
        purchaseDate: partsForm.value.purchaseDate
      };
      this.subTotal += partsForm.value.quantity * partsForm.value.price;
      this.taxbl = this.subTotal * this.tax;
      this.grandTotal = this.subTotal + this.taxbl;
      partsForm.reset();
    }
  }
  Submit(parts: Parts[]) {
    this.purchase.purchaseId = this.invoice_id;
    this.purchase.parts = parts;
    this.purchase.grandTotal = this.grandTotal;
    this.purchase.date = this.today;

    for (let data of this.purchase.parts) {
      this._partsService.partsStock(data).subscribe(
        res => {},
        err => {
          console.log(err);
        }
      );
    }
    this._partsService.purchase(this.purchase).subscribe(
      res => {
        this.saved = true;
        this._router.navigate(["/parts/purchase"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getAllSupliers() {
    this._suplerServie.getSupliers().subscribe(
      res => (this.supliers = res),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }
  addItem($event) {
    this.count += 1;
    this.editing = true;
    this.parts.push({
      itemPId: this.count,
      partNumber: "null",
      stamp: "null",
      quantity: -1,
      description: "null",
      remark: "null",
      supplier: "",
      price: -1,
      shelfNumber: "null",
      purchaseDate: "null"
    });
  }
  revert() {
    // reject key of form
    this.parts.splice(this.count - 1, 1);
    this.count -= 1;
    this.editing = false;
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open(
      "",
      "_blank",
      "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
    );
    popupWin.document.open();
    popupWin.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
        printContents +
        "</html>"
    );
    popupWin.document.close();
  }
}
