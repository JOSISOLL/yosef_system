import { Injectable } from '@angular/core';
import { Client } from './models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Customer } from './models/customer';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable()
export class ClientService {
  private _urlClientAdd = "http://localhost:3000/api/garage/client/add";
  private _urlClientGet = "http://localhost:3000/api/clients_get";
  private _urlClientUpdate = "http://localhost:3000/api/garage/client/update"; 
  private _urlClientDelete = "http://localhost:3000/api/garage/client/delete";

  constructor(
    private http : HttpClient, 
  ) { }
  
  addClient(client : Client): Observable<Client>{
    return this.http.post<Client>(this._urlClientAdd, client, httpOptions);
  }
  private log(mesage : string){
    //TODO: implementation for notification stil pending
  }
  getClients(){
    return this.http.get<any>(this._urlClientGet);
  }
  updateClient(client: Customer): Observable<Client>{
    return this.http.put<Client>(this._urlClientUpdate, client, httpOptions);
  }
  deleteCustomer(customer: Customer): Observable<Customer>{
    console.log("TAG: client.service.ts");
    console.log(customer);
    return this.http.delete<Customer>(`${this._urlClientDelete}/${customer.id}`, httpOptions); 
  }
  
}
