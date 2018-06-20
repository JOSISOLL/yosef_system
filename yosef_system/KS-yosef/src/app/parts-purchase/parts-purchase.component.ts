import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Parts } from '../models/parts';
import { Purchase } from '../models/purchase';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

declare var jquery: any; 
declare var $ :any;

@Component({
  selector: 'app-parts-purchase',
  templateUrl: './parts-purchase.component.html',
  styleUrls: ['./parts-purchase.component.css']
})
export class PartsPurchaseComponent implements OnInit {

  purchases : Purchase[]
  selectedPurchase : Purchase;
  selectedPart : Parts[]
  constructor(private _partsService: PartsService, private _router:Router) { }

  ngOnInit() {
    this.getPurchases()
  }

  getPurchases(){
    this._partsService.getPurchase()
    .subscribe(
      res => this.purchases = res,
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  setViewContent(data : Purchase){
    this.selectedPurchase = data;
    this.selectedPart = this.selectedPurchase.parts;
    console.log("View purchase clicked");
    console.log(this.selectedPurchase);
    $("#modal-view").modal('show');
    
  }
  editPurchase(data: Purchase) {
    this.selectedPurchase = data;
    console.log("Edit purchase clicked");
    console.log(this.selectedPurchase);
  }
  btn_deletePurchaseClick(purchase: Purchase){
    this.selectedPurchase = purchase;
    console.log("delete part clicked...");
    console.log(this.selectedPurchase);
    $("#modal-delete").modal('show');
    // $("#modal-delete").modal('show'); 
  }
  deletePart(){
    console.log("I'm about to delete " + this.selectedPurchase);
    this._partsService.deletePurchase(this.selectedPurchase)
    .subscribe(res => {
      console.log("Delete Successful!");
      $('#modal-delete').modal('hide');
      // this._router.navigate(['/parts/purchase'])
      this.ngOnInit()
    });
  }
}
