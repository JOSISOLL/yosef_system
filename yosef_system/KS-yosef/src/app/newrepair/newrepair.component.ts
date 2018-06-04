import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Repair } from '../models/repair';
declare var  jquery: any; 
declare var $:any;

@Component({
  selector: 'app-newrepair',
  templateUrl: './newrepair.component.html',
  styleUrls: ['./newrepair.component.css']
})

export class NewrepairComponent implements OnInit {
  repairs = []
  closeResult: string;
  selectedRepair: Repair;
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
  btn_showRepairInfoClick(repair: Repair){
    console.log("show repair button clicked...");
    this.selectedRepair =repair;
    $("#modal-view").modal('show'); 
    
  }
  btn_editRepairClick(repair: Repair){
    console.log("edit repair clicked...");
  }
  btn_deleteRepairClick(repair: Repair){
    console.log("delete repair clicked...");
  }
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
