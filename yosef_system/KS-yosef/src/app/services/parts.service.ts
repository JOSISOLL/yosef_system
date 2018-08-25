import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parts } from '../models/parts';
import { Purchase } from '../models/purchase';
import { Sell } from '../models/sell';
import { Import } from '../models/import';
@Injectable()
export class PartsService {

  _purchaseUrl = "http://localhost:3000/api/parts/purchase"
  _purchasesUrl = "http://localhost:3000/api/purchases"
   _partsStockUrl = "http://localhost:3000/api/parts/stock"
   _updateStockPartsUrl = "http://localhost:3000/api/stock/update"
   _deleteStockPartsUrl = "http://localhost:3000/api/stock/delete"
   _deletePurchaseUrl = "http://localhost:3000/api/purchase/delete"
   _partsSellUrl = "http://localhost:3000/api/parts/sell"
   _partsSoldUrl = "http://localhost:3000/api/parts/sold"
   _importsAddUrl = "http://localhost:3000/api/import/add"
   _importsGetUrl = "http://localhost:3000/api/imports"
   _importDeleteUrl = "http://localhost:3000/api/import/delete"
  constructor(private http: HttpClient) { }
  
  // purchase(part): Observable<Parts>
  // {
  //   return this.http.post<Parts>(this._purchaseUrl, part)
  // }
  addImport(data){
    return this.http.post<Import>(this._importsAddUrl, data)
  }
  getImport(){
    return this.http.get<Import>(this._importsGetUrl)
  }
  deleteImport(data){
    return this.http.delete<Import>(`${this._importDeleteUrl}/${data._id}`)
  }
  getPurchase(){
    return this.http.get<any>(this._purchasesUrl)
  }
  partsStock(part) : Observable<Parts>
  {
    return this.http.post<Parts>(this._partsStockUrl, part)
  }
  getStock(){
    return this.http.get<any>(this._partsStockUrl)
  }
  updateStock(part : Parts){
    return this.http.put<Parts>(this._updateStockPartsUrl, part)
  }
  deleteStock(part: any){
    return this.http.delete<Parts>(`${this._deleteStockPartsUrl}/${part._id}`);
  }
  purchase(purchase) : Observable<Purchase>
  {
    return this.http.post<Purchase>(this._purchaseUrl, purchase)
  }
  deletePurchase(purchase: any){
    return this.http.delete<Purchase>(`${this._deletePurchaseUrl}/${purchase._id}`);
  }
  sell(sell) : Observable<Sell>
  {
    return this.http.post<Sell>(this._partsSellUrl,sell)
  }
  getPartsSold(){
    return this.http.get<any>(this._partsSoldUrl);
  }

}
