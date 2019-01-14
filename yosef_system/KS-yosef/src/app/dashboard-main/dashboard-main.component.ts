import { Component, OnInit } from "@angular/core";
import { HistoryService } from "../history.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { SuplierService } from "../services/suplier.service";
import { PartsService } from "../services/parts.service";
import { ClientService } from "../client.service";

@Component({
  selector: "app-dashboard-main",
  templateUrl: "./dashboard-main.component.html",
  styleUrls: ["./dashboard-main.component.css"]
})
export class DashboardMainComponent implements OnInit {
  repairs = [];
  carsInRepair: number;
  partsInStock: number;
  clients: number;
  supliers: number;
  constructor(
    private _historyService: HistoryService,
    private _router: Router,
    private _partsService: PartsService,
    private _clientService: ClientService,
    private _suplerService: SuplierService
  ) {}

  ngOnInit() {
    this.getRepair();
    this.getStock();
    this.getCustomers();
    this.getSupliers();
  }
  getSupliers() {
    this._suplerService.getSupliers().subscribe(
      res => (this.supliers = res.length),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }
  getCustomers() {
    this._clientService.getClients().subscribe(
      res => {
        this.clients = res.length;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }
  getStock() {
    this._partsService.getStock().subscribe(
      res => {
        this.partsInStock = res.length;
      },

      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }
  getRepair() {
    this._historyService.getRepairs().subscribe(
      res => {
        this.repairs = res;
        this.carsInRepair = res.length;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }
}
