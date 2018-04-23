import { Injectable } from '@angular/core';
import { Client } from './models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable()
export class ClientService {
  private _urlClientAdd = "http://localhost:3000/api/garage/client/add";
  

  constructor(
    private http : HttpClient, 
  ) { }
  
  addClient(client : Client): Observable<Client>{
    return this.http.post<Client>(this._urlClientAdd, client, httpOptions);
  }
  private log(message : string){
    //TODO: implementation for notification stil pending
  }
}
