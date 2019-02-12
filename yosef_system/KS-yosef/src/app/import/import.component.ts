import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Import } from '../models/import';
import { ToastrService } from 'ngx-toastr';

declare var $ : any;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private _toast : ToastrService, private _service : PartsService) { }
  imports : Import;
  selected : Import;
  ngOnInit() {
    this.getImports()
    
  }
  getImports(){
    this._service.getImport()
    .subscribe(
      res =>{
        this.imports = res;
        console.log(this.imports);
      },
      err =>{
        console.log(err)
      }
    )
  }
  setViewContent(data : Import){
    this.selected = data;
    console.log("view imports clicked...");
    $("#modal-view").modal('show');
  }
  btn_deleteImportClick(data : Import){
    this.selected = data;
    console.log("Delete import clicked...")
    console.log(this.selected);
    $("#modal-delete").modal('show');
  }
  deleteImport(){
    console.log(this.selected);
    this._service.deleteImport(this.selected)
    .subscribe(res =>{
      console.log(res);
      this._toast.error("Delete Successful", "Deleted")
      $('#modal-delete').modal('hide');
      this.ngOnInit()
    });
  }
  
  btn_invoiceClick(data : Import){
      this.selected = data;
      console.log("view imports clicked...");
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
          <title>Yosef Koufails Import Attachment</title>
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
