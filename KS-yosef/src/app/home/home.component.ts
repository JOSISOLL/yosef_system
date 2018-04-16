import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  garageHistory = []
  constructor(private _historyService: HistoryService) { }

  ngOnInit() {
    this._historyService.getGarageHistory()
      .subscribe(
        res => this.garageHistory = res,
        err => console.log(err)
      )
      
  }

}
