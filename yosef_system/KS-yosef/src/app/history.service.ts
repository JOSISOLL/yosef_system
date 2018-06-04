import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Repair } from './models/repair';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};


@Injectable()
export class HistoryService {

  private _repairsUrl = "http://localhost:3000/api/repair";
  private _urlUpdateRepair = "http://localhost:3000/api/repair/update";
  
  constructor(private http: HttpClient) { }

  getRepairs(){
    return this.http.get<any>(this._repairsUrl)
  }
  updateRepair(repair: Repair){
    return this.http.put<Repair>(this._urlUpdateRepair, repair, httpOptions); 
  }
  
}
