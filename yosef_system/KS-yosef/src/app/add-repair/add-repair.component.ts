<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { RepairService } from '../repair.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Repair } from '../models/repair';
import { ToastrService } from 'ngx-toastr';
=======
import { Component, OnInit } from "@angular/core";
import { ClientService } from "../client.service";
import { RepairService } from "../repair.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Repair } from "../models/repair";
>>>>>>> add-excel-import

@Component({
  selector: "app-add-repair",
  templateUrl: "./add-repair.component.html",
  styleUrls: ["./add-repair.component.css"]
})
export class AddRepairComponent implements OnInit {
  repairForm: FormGroup;

  customer: FormControl;
  plateNumber: FormControl;
  reportedProblem: FormControl;
  carType: FormControl;
  remark: FormControl;
  personInCharge: FormControl;
  date: FormControl;

<<<<<<< HEAD
  clients = []
  constructor(private _toast : ToastrService,private _repairService: RepairService, private _clientService: ClientService, private _router: Router) { }
=======
  clients = [];
  constructor(
    private _repairService: RepairService,
    private _clientService: ClientService,
    private _router: Router
  ) {}
>>>>>>> add-excel-import

  createControls() {
    this.customer = new FormControl("", Validators.required);
    this.plateNumber = new FormControl();
    this.reportedProblem = new FormControl();
    this.carType = new FormControl();
    this.remark = new FormControl();
    this.personInCharge = new FormControl();
    this.date = new FormControl();
  }
  createForm() {
    this.repairForm = new FormGroup({
      customer: this.customer,
      plateNumber: this.plateNumber,
      reportedProblem: this.reportedProblem,
      carType: this.carType,
      remark: this.remark,
      personInCharge: this.personInCharge,
      date: this.date
    });
  }

  ngOnInit() {
    this._clientService.getClients().subscribe(
      res => (this.clients = res),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
    this.createControls();
    this.createForm();
  }
  onSubmit() {
    if (this.repairForm.valid) {
      var data = <Repair>this.repairForm.value;
      this._repairService.addRepair(data).subscribe(
        res => {
<<<<<<< HEAD
          this._toast.success("Repair added successfully", 'Success')
          console.log(res)
          this._router.navigate(['/repair'])
        },
        err => console.log(err)
      )
    }
    else{
      this._toast.error("Form is Invalid", 'Error')
      console.log("FROM IS INVALID");
=======
          this._router.navigate(["/repair"]);
        },
        err => console.log(err)
      );
>>>>>>> add-excel-import
    }
  }
}
