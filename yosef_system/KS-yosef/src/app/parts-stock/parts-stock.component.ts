import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Parts } from '../models/parts';

@Component({
  selector: 'app-parts-stock',
  templateUrl: './parts-stock.component.html',
  styleUrls: ['./parts-stock.component.css']
})
export class PartsStockComponent implements OnInit {

  parts : Parts[]
  constructor(private _partsService : PartsService, private _router : Router) { }

  ngOnInit() {
    this.getStock();
  }
  getStock(){
    this._partsService.getStock()
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
