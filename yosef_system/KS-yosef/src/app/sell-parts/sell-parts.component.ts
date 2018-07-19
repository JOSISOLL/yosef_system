import { Component, OnInit } from '@angular/core';
import { Parts } from "../models/parts";
import { Sell } from "../models/sell";

@Component({
  selector: 'app-sell-parts',
  templateUrl: './sell-parts.component.html',
  styleUrls: ['./sell-parts.component.css']
})
export class SellPartsComponent implements OnInit {

  sell : Sell[] = [];
  tasks = [];
  task : string
  parts : Parts[] = [];
  constructor() { }

  ngOnInit() {
  }
  

  onClick(){
  	this.tasks.push({name: this.task, strike: false});
  	this.task = '';
  }
}
