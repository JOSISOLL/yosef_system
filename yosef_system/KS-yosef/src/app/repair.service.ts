import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddRepairComponent } from './add-repair/add-repair.component';


@Injectable()
export class RepairService {
  private _repairAddUrl = "http://localhost:3000/api/repair/add"
  constructor(private http:HttpClient, private _router: Router) { }

  addRepair(repair){
    return this.http.post<any>(this._repairAddUrl, repair)
  }
  
}

