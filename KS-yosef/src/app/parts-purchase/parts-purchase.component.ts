import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Parts } from '../models/parts';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parts-purchase',
  templateUrl: './parts-purchase.component.html',
  styleUrls: ['./parts-purchase.component.css']
})
export class PartsPurchaseComponent implements OnInit {

  parts : Parts[]
  constructor(private _partsService: PartsService, private _router:Router) { }

  ngOnInit() {
    this.getPurchases()
  }

  getPurchases(){
    this._partsService.getPurchase()
    .subscribe(
      res => this.parts = res,
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }


}
