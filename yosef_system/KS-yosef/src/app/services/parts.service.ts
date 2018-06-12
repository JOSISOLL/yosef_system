import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parts } from '../models/parts';
import { Purchase } from '../models/purchase';

@Injectable()
export class PartsService {

  _purchaseUrl = "http://localhost:3000/api/parts/purchase"
  _purchasesUrl = "http://localhost:3000/api/purchases"
  constructor(private http: HttpClient) { }
  
  // purchase(part): Observable<Parts>
  // {
  //   return this.http.post<Parts>(this._purchaseUrl, part)
  // }
  getPurchase(){
    return this.http.get<any>(this._purchasesUrl)
  }
  purchase(purchase) : Observable<Purchase>
  {
    return this.http.post<Purchase>(this._purchaseUrl, purchase)
  }

}
