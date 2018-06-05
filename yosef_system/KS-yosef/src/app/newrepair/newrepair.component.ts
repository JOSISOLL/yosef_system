import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var  jquery: any; 
declare var $:any;

@Component({
  selector: 'app-newrepair',
  templateUrl: './newrepair.component.html',
  styleUrls: ['./newrepair.component.css']
})
export class NewrepairComponent implements OnInit {

  repairs = []
  selectedRepair: any = null;
  closeResult: string;
  constructor(private _historyService: HistoryService, private _router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this._historyService.getRepairs()
      .subscribe(
        res => {
          this.repairs = res
          console.log(res)
        
        },
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])

            }
          }
        }
      )
      
      
  }

  btn_showRepairInfoClick(repair){
    this.selectedRepair = repair;
    $("#modal-view").modal("show");
    console.log("show repair button clicked");
    // console.log(repair);
  }


}
