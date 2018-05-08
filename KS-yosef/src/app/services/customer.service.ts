import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from "../models/customer";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerService {
  private _baseURL = "http://localhost:3000"; 
  private _apiCustomerAdd = "/api/customer/add";
  constructor(private http: HttpClient) { }


  add(customer): Observable<Customer> {
    var url = this._baseURL.concat(this._apiCustomerAdd);
    return this.http.post<Customer>(url, customer, httpOptions);
  }

}
