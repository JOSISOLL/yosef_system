import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Items } from "../models/items";
import { PartsService } from "../services/parts.service";
import { Router } from "@angular/router";
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // count : number;
  // editing : boolean;
  // invoice = {};
  // selectedPart : Items;
  // grandTotal : number;
  
  constructor(private _partsService: PartsService, private _router: Router) { }

  // ngOnInit() {
  //   this.count = 0;
  //   this.grandTotal = 0;
  //   this.editing = false;
    
  // }
  // add(){
  // console.log(this.invoice)
  // }
  // heroes = [{"name" : 'Windstorm'}, {"name": 'Bombasto'}, {"name": 'Magneta'}, {"name" : 'Tornado'}];
  // addHero(newHero) {
  //   if (newHero) {
  //     this.heroes.push({"name" : newHero});
  //     console.log(newHero)
  //   }
  // }
  // remove(hero : string){
  //   this.heroes.forEach( (item, index) => {
  //     if(item === hero) this.heroes.splice(index,1);
  //   });
    
  // }
  // addItem($event) { // for FAB button handling
  //   this.count += 1;
  //   this.editing = true;
  //   this.invoice.push({id: this.count, partNumber: "null", stamp: "null", description: "null", quantity: -1, unitPrice: -1});
  // }
  
  // revert() {  // reject key of form
  //   this.invoice.splice(this.count - 1, 1);
  //   this.count -= 1;
  //   this.editing = false;
  // }

  // count: number;  // count of invoices
  // editing: boolean; // is user in process of adding new invoice
  // items: Items[] = [

  // ];
  // subTotal: number // total cost before tax
  // tax : number
  // grandTotal: number; // total cost of all invoices

  ngOnInit() {  // init function called to initialize variables
    // this.count = 0;
    // this.grandTotal = 0;
    // this.subTotal = 0;
    // this.editing = false;
  }

  // addItem($event) { // for FAB button handling
  //   this.count += 1;
  //   this.editing = true;
  //   this.items.push({id: this.count, name: "null", quantity: -1, rate: -1});
    
  // }

  // onSubmit(f: NgForm) { // accept key of form
  //   console.log(f.value);
  //   console.log(f.valid);
  //   if (f.valid) {
  //     this.items[this.count - 1] = {id: this.count - 1, name: f.value.name, quantity: f.value.quantity, rate: f.value.rate};
  //     this.subTotal += f.value.quantity * f.value.rate;
  //     this.tax = 0.15;
  //     this.grandTotal += f.value.quantity * f.value.rate;
  //   }
  //   f.reset();
  //   this.editing = false;
  //   console.log(this.items)
  // }

  // revert() {  // reject key of form
  //   this.items.splice(this.count - 1, 1);
  //   this.count -= 1;
  //   this.editing = false;
  // }
  arrayBuffer:any;
  file:File;
  excel_data : any [];
  loaded : boolean = false
  incomingfile(event) {
    this.file= event.target.files[0]; 
  }

 Upload() {
  let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.loaded = true;
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.excel_data = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        // console.log(this.excel_data);
    }
    fileReader.readAsArrayBuffer(this.file);
}
save(){
  for(let data of this.excel_data){
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
}


}

//   availableCurrencies = {
//     "name": "Birr",
//     "symbol": "ETB"
//   }
// }


