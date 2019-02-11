import { Component, OnInit} from '@angular/core';
import { HistoryService } from '../history.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SuplierService } from '../services/suplier.service';
import { PartsService } from '../services/parts.service';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';
import * as CanvasJS from '../../assets/canvasjs-2.2/canvasjs.min'
import { Checkout } from '../models/checkout';
import { Repair } from '../models/repair';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ValueTransformer } from '@angular/compiler/src/util';


declare var _ : any;

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  chart = []
  repairs  = []
  checkouts : any = []
  dataPoints = []
  dataPoint = []
  
  
  
  partsInStock : number
  clients : number
  supliers : number
  constructor(private toastr : ToastrService, private _historyService: HistoryService, private _router : Router,private _partsService : PartsService, private _clientService : ClientService, private _suplerService : SuplierService) { }

  ngOnInit() {
    
    this.getRepair();
    this.getCheckout();
    this.getStock();
    this.getCustomers();
    this.getSupliers();  
  }
  getRepair(){
    this._historyService.getRepairs()
    .subscribe(res =>{
      this.repairs = res
    })
  }
  getCheckout(){
    this._historyService.getCheckouts()
    .subscribe(
      res =>{
        this.checkouts = res
        this.pieChartContainer(this.checkouts.length, this.repairs.length);
        this.dataPoint = [{y: this.checkouts.length, label : "Checkout"}, {y:this.repairs.length , label: "Repairs"}]
        this.chartContainer(this.dataPoint)
      })
  }
  pieChartContainer(check, repair){    
    let chart = new CanvasJS.Chart("pieChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: repair, name: "Repair" },
          { y: check, name: "Checkout" },
        ]
      }]
    });
      
    chart.render();
  }
  chartContainer(data){
    
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: "column",
        dataPoints: data
      }]
    });      
    chart.render();
  }
  getSupliers(){
    this._suplerService.getSupliers().subscribe(
      res => this.supliers = res.length, 
        err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
  getCustomers(){
    this._clientService.getClients()
      .subscribe(
        res => {this.clients = res.length
        
        },
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])

            }
          }
      })
  }
  getStock(){
    this._partsService.getStock()
    .subscribe(
      
      res => {
        this.partsInStock = res.length;
      },

      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
  

}
