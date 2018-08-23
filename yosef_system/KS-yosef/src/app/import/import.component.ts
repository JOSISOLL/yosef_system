import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Import } from '../models/import';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private _service : PartsService) { }
  imports : Import
  ngOnInit() {
    this.getImports()
  }
  getImports(){
    this._service.getImport()
    .subscribe(
      res =>{
        this.imports = res;
        // console.log(res);
      },
      err =>{
        console.log(err)
      }
    )
  }

}
