import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-newrepair',
  templateUrl: './newrepair.component.html',
  styleUrls: ['./newrepair.component.css']
})
export class NewrepairComponent implements OnInit {

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
 
  // deleteCustomer(Id){
  //   var iAnswer = confirm("Are you sure you want to delete this Car ?");
  //   if(iAnswer){
  //     window.location = 'http://sakosys.com/temp/garage-management-system/repaircar/carlist.php?id=' + Id;
  //     }
  //   }
              
  //   $( document ).ready(function() {
  //     setTimeout(function() {
  //       $("#me").hide(300);
  //       $("#you").hide(300);
  //       }, 3000);
  //     });

}
