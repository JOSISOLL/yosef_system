import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';

import { Manufaturer } from '../models/manufaturer';
import { MANUFACTURERS } from '../mock-manufaturer';

@Injectable()
export class ManufaturerService {
  constructor() { }
  getManufacturers(): Observable<Manufaturer[]>{
    return of(MANUFACTURERS);
  }
}
