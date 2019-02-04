import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SuplierService } from '../services/suplier.service';
import { PartsService } from '../services/parts.service';
import { ClientService } from '../client.service';
import { Chart } from 'chart.js';
import * as CanvasJS from '../../assets/canvasjs-2.2/canvasjs.min'
import { groupBy } from 'rxjs/operators';
import { stringify } from 'querystring';

declare var _ : any;

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  chart = []
  repairs = []
  dataPoints = []
  dataPoint = [{y: 25, label : "September 2018"}, {y:35 , label: "August 2019"}]
  
  
  // carsInRepair : number
  partsInStock : number
  clients : number
  supliers : number
  constructor(private _historyService: HistoryService, private _router : Router,private _partsService : PartsService, private _clientService : ClientService, private _suplerService : SuplierService) { }

  ngOnInit() {
    
    this.getRepair();
    this.getStock();
    this.getCustomers();
    this.getSupliers();
    this.chartContainer();
    this.pieChartContainer();
    // console.log(this.repairs)

    
  }
  getRepair(){
    let repairDates = []
    this._historyService.getRepairs()
      .subscribe(
        res => {
          let allDates = []
          
          
          
          res.forEach(pair => {
            let toDate = new Date(pair.date);
            allDates.push(toDate)
          });
          this.repairs = res
          var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
          var map_result = allDates.map(function (item) {
            var d = new Date(item);
            var month = monthNames[d.getMonth()] + ", " + d.getFullYear();
            return {
                "Month": month,
                "Repair_Count": 1
            };
        });
        var result_temp = map_result.reduce(function (memo, item) {
          if (memo[item.Month] === undefined) {
              memo[item.Month] = item.Repair_Count;
          }else{
              memo[item.Month] += item.Repair_Count;
          }
          return memo;
      },{});
      Object.entries(result_temp).forEach(mapp =>{
        let temp = {y : mapp[1], label: mapp[0]}
        this.dataPoints.push(temp) 
      })
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
  pieChartContainer(){
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
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    chart.render();
  }
  chartContainer(){
    
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: "column",
        dataPoints: this.dataPoint
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
        console.log(this.clients)},
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
