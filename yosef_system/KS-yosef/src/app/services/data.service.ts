import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Parts } from '../models/parts';

@Injectable()
export class DataService {

  partsData : Parts;
  constructor() { }

  sendPartsDat(data : Parts){
    this.partsData = data
  }

}
