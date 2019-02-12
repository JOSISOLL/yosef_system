<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sell } from '../models/sell';
import { Parts } from '../models/parts';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
=======
import { Component, OnInit } from "@angular/core";
import { PartsService } from "../services/parts.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Sell } from "../models/sell";
import { Parts } from "../models/parts";
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
>>>>>>> add-excel-import

declare var $: any;

@Component({
  selector: "app-sell-parts-list",
  templateUrl: "./sell-parts-list.component.html",
  styleUrls: ["./sell-parts-list.component.css"]
})
export class SellPartsListComponent implements OnInit {
  sold: Sell[];
  parts: Parts[];
  selected: Sell;
  myForm: FormGroup;
  id: FormControl;
  buyerName: FormControl;
  buyerPhoneNumber: FormControl;
  // sellId : FormControl;
  buyerTinNumber: FormControl;
  personInCharge: FormControl;

<<<<<<< HEAD
  constructor(private _toast : ToastrService, private _partsService : PartsService, private _router : Router) { }
=======
  constructor(private _partsService: PartsService, private _router: Router) {}
>>>>>>> add-excel-import

  ngOnInit() {
    this.getSoldItems();
    this.createControls();
    this.createEditForm();
  }
  getSoldItems() {
    this._partsService.getPartsSold().subscribe(
      res => {
        this.sold = res;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }

  btn_showSoldInfoClick(sold: Sell) {
    this.selected = sold;
    this.parts = sold.parts;
    $("#modal-view").modal("show");
  }
  btn_invoiceClick(sold: Sell) {
    this.selected = sold;
    this.parts = sold.parts;
    $("#modal-invoice").modal("show");
  }
  btn_editSellClick(sold: any) {
    this.selected = sold;
    this.myForm.setValue({
      id: sold._id,
      // sellId : sold.sellId,
      buyerName: sold.buyerName,
      buyerPhoneNumber: sold.buyerPhoneNumber,
      buyerTinNumber: sold.buyerTinNumber,
      personInCharge: sold.personInCharge
    });
    $("#modal-edit").modal("show");
  }
  createControls() {
    this.id = new FormControl();
    // this.sellId = new FormControl();
    this.buyerName = new FormControl();
    this.buyerPhoneNumber = new FormControl();
    this.buyerTinNumber = new FormControl();
    this.personInCharge = new FormControl();
  }
  createEditForm() {
    this.myForm = new FormGroup({
      id: this.id,
      // sellId : this.sellId,
      buyerName: this.buyerName,
      buyerPhoneNumber: this.buyerPhoneNumber,
      buyerTinNumber: this.buyerTinNumber,
      personInCharge: this.personInCharge
    });
  }
  saveUpdates() {
    if (this.myForm.valid) {
      var data = <any>this.myForm.value;
    }
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById("printSectionId").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Yosef Koufails Invoice Attachment</title>
          <style>
          .md-dialog-actions{display:none}
          .invoice-box{
            max-width:800px;
            margin:auto;
            padding:30px;
            border:1px solid #eee;
            box-shadow:0 0 10px rgba(0,0,0,.15);
            font-size:16px;
            line-height:24px;
            color:#555
          }
          .invoice-box table{
            width:100%;
            line-height:inherit;
            text-align:left
          }
          .invoice-box table td{
            padding:5px;
            vertical-align:top
          }
          .invoice-box table tr td:nth-child(2){
            text-align:left
          }
          .invoice-box table tr.top table td{
            padding-bottom:20px
          }
          .invoice-box table tr.top table td.title{
            font-size:45px;
            line-height:45px;
            color:#333
          }
          .invoice-box table tr.information table td{
            padding-bottom:40px
          }
          .invoice-box table tr.heading td{
            background:#eee;
            border-bottom:1px solid #ddd;
            font-weight:700
          }
          .invoice-box table tr.details td{
            padding-bottom:20px
          }
          .invoice-box table tr.item td{
            border-bottom:1px solid #eee
          }
          .invoice-box table tr.item.last td{
            border-bottom:none
          }
          .invoice-box table tr.total td:nth-child(2){
            border-top:1px solid #eee;
            font-weight:700;
            text-align: right
          } 
          .main-footer {
            background: #fff;
            padding: 15px;
            color: #444;
            border-top: 1px solid #d2d6de;
          }
          
          </style>
        </head>
        
      <body onload="window.print();window.close()">${printContents}</body>
      <footer class="main-footer">
        <strong>Copyright &copy; 2018-2020 ቀላል TECHNOLOGIES.</strong> All rights reserved.
      </footer>
    </html>`);
    popupWin.document.close();
  }
}
