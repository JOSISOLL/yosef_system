import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Checkout } from '../models/checkout';
import { Repair } from '../models/repair';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

declare var $:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkout : Checkout;
  repair : Repair;
  parts = []
  subTotal : number = 0;
  partsTotal : number = 0;
  grandTotal : Number = 0;
  selected : Checkout;
  constructor(private _historyService : HistoryService, private _router : Router) { }

  ngOnInit() {
    this.getCheckouts()
  }
  getCheckouts(){
    this._historyService.getCheckouts()
    .subscribe(
      res =>{
        this.checkout = res
        // this.repair = res.repair
        console.log(this.checkout)
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
  btn_showCheckInfoClick(checkout : Checkout){
    console.log("Show checkout info button clicked...");
    this.selected = checkout;
    this.repair = checkout.repair;
    this.parts = checkout.changedParts; 
    console.log(this.selected)
    $("#modal-view").modal('show')
  }

  btn_invoiceClick(checkout : Checkout){
    this.selected = checkout;
    this.selected.changedParts.forEach(part =>{
      var price : number = part['price']
      var qty : number = part['quantity']
      let prd : number = price * qty
      this.partsTotal += prd
      
    })
    
    this.grandTotal = toInteger(this.partsTotal) + toInteger(this.selected.serviceCharge)
    this.subTotal =toInteger(this.grandTotal) - (toInteger(this.grandTotal) * 0.15)
    // console.log(this.partsTotal)
    $("#modal-invoice").modal('show');
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printSectionId').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
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
    </html>`
    );
    popupWin.document.close();
    this.close()
    
  }
  close(){
    $("#modal-invoice").modal('hide');
    this.grandTotal = 0
    this.partsTotal = 0;
    this.subTotal = 0;
  }

}
