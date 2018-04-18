import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  garageHistory = []
  constructor(private _historyService: HistoryService, private _router: Router) { }

  ngOnInit() {
    this._historyService.getGarageHistory()
      .subscribe(
        res => this.garageHistory = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])

            }
          }
        }
      )
      
  }

}
