import { Component, OnInit } from "@angular/core";
import { PartsService } from "../services/parts.service";
import { Parts } from "../models/parts";
import { Purchase } from "../models/purchase";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-parts-purchase",
  templateUrl: "./parts-purchase.component.html",
  styleUrls: ["./parts-purchase.component.css"]
})
export class PartsPurchaseComponent implements OnInit {
  purchases: Purchase[];
  selectedPurchase: Purchase;
  selectedPart: Parts[];
  constructor(
    private _partsService: PartsService,
    private _router: Router,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases() {
    this._partsService.getPurchase().subscribe(
      res => (this.purchases = res),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }

  setViewContent(data: Purchase) {
    this.selectedPurchase = data;
    this.selectedPart = this.selectedPurchase.parts;
    console.log("View purchase clicked");
    console.log(this.selectedPurchase);
    $("#modal-view").modal("show");
  }
  editPurchase(data: Purchase) {
    this.selectedPurchase = data;
    console.log("Edit purchase clicked");
    console.log(this.selectedPurchase);
  }
  btn_deletePurchaseClick(purchase: Purchase) {
    this.selectedPurchase = purchase;
    console.log("delete part clicked...");
    console.log(this.selectedPurchase);
    $("#modal-delete").modal("show");
    // $("#modal-delete").modal('show');
  }
  deletePart() {
    console.log("I'm about to delete " + this.selectedPurchase);
    this._partsService.deletePurchase(this.selectedPurchase).subscribe(res => {
      console.log("Delete Successful!");
      $("#modal-delete").modal("hide");
      // this._router.navigate(['/parts/purchase'])
      this.ngOnInit();
    });
  }
  btn_invoiceClick(data: Purchase) {
    this.selectedPurchase = data;
    this.selectedPart = data.parts;
    console.log(this.selectedPurchase);
    $("#modal-invoice").modal("show");
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

  open() {
    console.log("ATTEMPTING TO SHOW MODAL");
    $("#modal-import").modal("show");
  }
}
