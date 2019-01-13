import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Repair } from './models/repair';
import { Checkout } from './models/checkout';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};


@Injectable()
export class HistoryService {

  private _repairsUrl = "http://localhost:3000/api/repair";
  private _urlUpdateRepair = "http://localhost:3000/api/repair/update";
  private _urlDeleteRepair = "http://localhost:3000/api/repair/delete";
  private _urlCheckoutRepair = "http://localhost:3000/api/repiar/checkout";
  
  constructor(private http: HttpClient) { }

  getRepairs(){
    return this.http.get<any>(this._repairsUrl)
  }
  updateRepair(repair: Repair){
    return this.http.put<Repair>(this._urlUpdateRepair, repair, httpOptions); 
  }
  deleteRepair(repair: Repair){
    return this.http.delete<Repair>(`${this._urlDeleteRepair}/${repair._id}`, httpOptions);
  }
  checkoutRepair(checkout : Checkout){
    return this.http.post<Checkout>(this._urlCheckoutRepair, checkout, httpOptions);
  }

  
}
