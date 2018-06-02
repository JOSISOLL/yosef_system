import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

declare var  jquery: any; 
declare var $:any;

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  clients = []
  selectedClient: any = null;
  constructor(private _clientService: ClientService, private _router: Router) { }
  ngOnInit() {
    this._clientService.getClients()
      .subscribe(
        res => this.clients = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])

            }
          }
        }
      )
      
  }

  btn_showClientInfoClick(client){
    this.selectedClient = client;
    $("#modal-view").modal("show");
    console.log("show client button clicked");
    console.log(client);
  }
  btn_editClientClick(){
    $('#modal-edit').modal('show'); 
    console.log("show edit client clicked");
  }
  btn_deleteClientClick(){
    $('modal-delete').modal('show');
    console.log("show delete client clicked"); 
  }

}
