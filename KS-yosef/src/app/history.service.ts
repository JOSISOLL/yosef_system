import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HistoryService {

  _historyUrl = "http://localhost:3000/api/garage_history"
  constructor(private http: HttpClient) { }

  getGarageHistory(){
    return this.http.get<any>(this._historyUrl)
  }
}
