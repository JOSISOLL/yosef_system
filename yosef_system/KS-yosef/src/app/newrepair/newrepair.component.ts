import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Repair } from '../models/repair';
import { Checkout } from '../models/checkout';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

// declare var  jquery: any; 
// declare var $:any;

declare var  jquery: any; 
declare var $:any;

@Component({
  selector: 'app-newrepair',
  templateUrl: './newrepair.component.html',
  styleUrls: ['./newrepair.component.css']
})

export class NewrepairComponent implements OnInit {
  repairs = []

  // checkout : Checkout;
  checkout : Checkout = {};
  
  closeResult: string;
  selectedRepair: Repair;
  myForm: FormGroup; 
  id: FormControl; 
  customer: FormControl; 
  plateNumber: FormControl; 
  reportedProblem: FormControl; 
  carType: FormControl; 
  remark: FormControl; 
  personInCharge: FormControl; 
  date: FormControl;

  partsChanged = []
  partNumber : string;
  stamp : string;
  quantity : number;
  price : string; 
  invalid : boolean;

  name : string
  menInCharge = []
  
  tinNumber : string
  problemsFixed : string;
  serviceCharge : number
  checkoutDate : string


  constructor(private _historyService: HistoryService, private _router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.createControls(); 
    this.createEditForm(); 
    this.getRepair();
    
  }
  getRepair(){
    this._historyService.getRepairs()
      .subscribe(
        res => {
          this.repairs = res
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
    this.selectedRepair = repair; 
    this.myForm.setValue({
      id: repair._id,
      customer: repair.customer, 
      plateNumber: repair.plateNumber, 
      reportedProblem: repair.reportedProblem, 
      carType: repair.carType, 
      remark: repair.remark, 
      personInCharge: repair.personInCharge,
      date: repair.date
    });
    $("#modal-edit").modal('show'); 
    console.log("edit repair clicked...");
  }
  btn_deleteRepairClick(repair: Repair){
    this.selectedRepair = repair;
    console.log("delete repair clicked...");
    $("#modal-delete").modal('show'); 
  }
  btn_checkoutCar(repair: Repair){
    this.selectedRepair = repair; 
    console.log("repair checkout selected...");
    $("#modal-checkout").modal('show'); 
  } 
  createControls(){
    this.id = new FormControl(); 
    this.customer = new FormControl();
    this.plateNumber = new FormControl(); 
    this.reportedProblem = new FormControl(); 
    this.carType = new FormControl(); 
    this.remark  = new FormControl(); 
    this.personInCharge = new FormControl(); 
    this.date = new FormControl(); 
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id: this.id, 
      customer: this.customer, 
      plateNumber: this.plateNumber, 
      reportedProblem: this.reportedProblem, 
      carType: this.carType, 
      remark: this.remark, 
      personInCharge: this.personInCharge, 
      date: this.date
    });

  }
  saveUpdates(){
    if(this.myForm.valid){
      var data = <Repair> this.myForm.value; 
      console.log('form data..');
      console.log(data);
      this._historyService.updateRepair(data)
      .subscribe(res =>{
        
        this.selectedRepair.customer = data.customer; 
        this.selectedRepair.plateNumber = data.plateNumber; 
        this.selectedRepair.reportedProblem = data.reportedProblem;
        this.selectedRepair.carType = data.carType; 
        this.selectedRepair.remark = data.remark; 
        this.selectedRepair.personInCharge = data.personInCharge; 
        this.selectedRepair.date = data.date; 
        $('#modal-edit').modal('hide'); 
      });
    }
  }
  deleteRepair(){
    this._historyService.deleteRepair(this.selectedRepair)
    .subscribe(res => {
      console.log("successfully deleted!");
      $('#modal-delete').modal('hide');
      this.getRepair();
    });
  }
  
addChangedParts(){
  
  if(this.partNumber != null && this.stamp != null && this.quantity != null && this.price != null){
    this.partsChanged.push({
      partNumber : this.partNumber,
      stamp : this.stamp,
      quantity : this.quantity,
      price : this.price
    })
    console.log(this.partsChanged)
    this.partNumber = '';
    this.stamp = '';
    this.quantity = null;
    this.price = '';
    this.invalid = true;
    }
    else {
        this.invalid = false;
        console.log("Add changed parts invalid"); 
    }
  }
  addPersonInCharge(){
    if(this.name != null){
      this.menInCharge.push({
        name : this.name
      })
      this.name = ''
    }
  }
  checkOut(){
    console.log("Checkout modal button clicked");
    this.checkout.changedParts = this.partsChanged;
    this.checkout.menInCharge = this.menInCharge;
    this.checkout.problemsFixed = this.problemsFixed;
    this.checkout.repair = this.selectedRepair;
    this.checkout.serviceCharge = this.serviceCharge;
    this.checkout.tinNumber = this.tinNumber;
    this.checkout.checkoutDate = this.checkoutDate;
    console.log(this.checkout)
    this._historyService.checkoutRepair(this.checkout)
    .subscribe(res =>{
      console.log("Repair checked out successfully");
      this.deleteRepair();
      $('#modal-checkout').modal('hide');
    })
    // console.log(this.selectedRepair)
    
  }
}
