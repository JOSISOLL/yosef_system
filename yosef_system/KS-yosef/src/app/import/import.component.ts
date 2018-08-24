import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
import { Import } from '../models/import';

declare var $ : any;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private _service : PartsService) { }
  imports : Import;
  selected : Import;
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
  setViewContent(data : Import){
    this.selected = data;
    console.log("view imports clicked...");
    $("#modal-view").modal('show');
  }
  btn_deleteImportClick(data : Import){
    this.selected = data;
    console.log("Delete import clicked...")
    console.log(this.selected);
    $("#modal-delete").modal('show');
  }
  deleteImport(){
    console.log(this.selected);
    this._service.deleteImport(this.selected)
    .subscribe(res =>{
      console.log(res);
      console.log("Delete successful!");
      $('#modal-delete').modal('hide');
      this.ngOnInit()
    });
  }

}
