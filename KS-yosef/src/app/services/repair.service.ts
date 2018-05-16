import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repair } from "../models/repair";

@Injectable()
export class RepairService {

  constructor() { }

  // add(repair): Observable<Repair> {
  add(repair){
    // var url = this._baseURL.concat(this._apiCustomerAdd);
    // return this.http.post<Customer>(url, customer, httpOptions);
    console.log(repair)
  }


}
