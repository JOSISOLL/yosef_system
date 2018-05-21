import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-parts',
  templateUrl: './purchase-parts.component.html',
  styleUrls: ['./purchase-parts.component.css']
})
export class PurchasePartsComponent implements OnInit {

  constructor() { }
  invoice_id : Number
  ngOnInit() {
    this.invoice_id = this.randomInt(10000,20000)
    console.log(this.invoice_id)
  }
  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

}
