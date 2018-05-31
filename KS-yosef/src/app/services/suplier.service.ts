import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suplier } from "../models/suplier";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SuplierService {
  private _baseURL = "http://localhost:3000"; 
  private _apiSuplierAdd = "/api/suplier/add";
  private _apiSuplierGetAll = "/api/supliers";

  constructor(private http: HttpClient) { }

  add(customer): Observable<Suplier> {
    var url = this._baseURL.concat(this._apiSuplierAdd);
    return this.http.post<Suplier>(url, customer, httpOptions);
  }
  getSupliers(){
    var url = this._baseURL.concat(this._apiSuplierGetAll);
    return this.http.get<any>(url)
  }
}
