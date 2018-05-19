import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HistoryService {

  _repairsUrl = "http://localhost:3000/api/repair"
  constructor(private http: HttpClient) { }

  getRepairs(){
    return this.http.get<any>(this._repairsUrl)
  }
}
