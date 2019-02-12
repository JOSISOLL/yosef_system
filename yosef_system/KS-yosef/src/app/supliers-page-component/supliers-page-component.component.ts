import { Component, OnInit } from "@angular/core";
import { Suplier } from "../models/suplier";
import { SuplierService } from "../services/suplier.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import * as XLSX from "ts-xlsx";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-supliers-page-component",
  templateUrl: "./supliers-page-component.component.html",
  styleUrls: ["./supliers-page-component.component.css"]
})
export class SupliersPageComponentComponent implements OnInit {
  supliers: Suplier[];
  selectedSuplier: Suplier;
  mock_data: any[] = ["SAMPLE-1", "SAMPLE-2", "SAMPLE-3"];
  file: File;
  arrayBuffer: any;
  excel_data: any[];
  loaded: boolean = false;

  constructor(private _suplerServie: SuplierService, private _router: Router) {}

  ngOnInit() {
    this.getAllSupliers();
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
  setViewContent(data: Suplier) {
    this.selectedSuplier = data;

    $("#modal-view-suplier").modal("show");
  }
  setEditContent(data: Suplier) {
    this.selectedSuplier = data;
    $("#modal-edit-suplier").modal("show");
  }

  openImportModalClicked() {
    $("#modal-import").modal("show");
  }
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  async startImportClicked() {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var firstSheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheetName];
      this.excel_data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.excel_data.forEach(element => {
        this._suplerServie.add(element).subscribe(customer => {});
      });
      this.getAllSupliers();
    };
    fileReader.readAsArrayBuffer(this.file);

    $("#modal-import").modal("hide");
    //this.getAllSupliers();
  }
}
