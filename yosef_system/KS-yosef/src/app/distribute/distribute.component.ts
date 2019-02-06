import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Distribute } from '../models/distribute'
import { Imported_Parts } from '../models/imported_parts';
// import { FormControl, FormGroup } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-distribute',
  templateUrl: './distribute.component.html',
  styleUrls: ['./distribute.component.css']
})
export class DistributeComponent implements OnInit {

  distribute : Distribute;
  imported_parts : Imported_Parts [];
  selected : Distribute;
  // myForm : FormGroup;
  // id : FormControl;
  // buyerName : FormControl;
  // buyerPhoneNumber : FormControl;
  // buyerTinNumber : FormControl;
  // personInCharge : FormControl;

  constructor( private _partsService : PartsService, private _router : Router) { }

  ngOnInit() {
    this.getDistParts()
  }
  getDistParts(){
    this._partsService.getDistributes()
    .subscribe(
      res => {
        this.distribute = res
        console.log(res)
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
  btn_showDistInfoClick(distribute : Distribute){
    console.log("Show distributed item button clicked...");
    this.selected = distribute;
    this.imported_parts = distribute.parts;
    console.log(this.selected)
    $("#modal-view").modal('show');
  }
  btn_invoiceClick(distribute : Distribute){
    this.selected = distribute;
    this.imported_parts = distribute.parts
    console.log(this.selected);
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
  }
}
