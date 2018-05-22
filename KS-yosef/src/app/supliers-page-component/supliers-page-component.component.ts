import { Component, OnInit } from '@angular/core';
import { Suplier } from '../models/suplier';
import { SuplierService } from '../services/suplier.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supliers-page-component',
  templateUrl: './supliers-page-component.component.html',
  styleUrls: ['./supliers-page-component.component.css']

})
export class SupliersPageComponentComponent implements OnInit {
  supliers: Suplier[];
  constructor(private _suplerServie: SuplierService, private _router:Router) { }
  
  ngOnInit() {
    this.getAllSupliers();
  }

  getAllSupliers(){
    this._suplerServie.getSupliers().subscribe(
      res => this.supliers = res, 
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
