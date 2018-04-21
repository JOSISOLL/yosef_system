import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService }  from '../client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  rForm: FormGroup; 
  post:any; 
  customer_name:string = ''; 
  date:string = '';
  plate_number:string = '';
  reported_problem:string = '';
  remark:string = '';
  car_type:string='';
  person_in_charge:string = '';

  constructor(

    private fb: FormBuilder, 
    private clientService: ClientService

  ) {

    this.rForm = fb.group({
      'customer_name' : [null , Validators.required], 
      'date' : [null , Validators.required], 
      'plate_number':[null, Validators.required], 
      'reported_problem':[null, Validators.required], 
      'remark': [null, Validators.required],
      'car_type': [null, Validators.required],
      'person_in_charge':[null, Validators.required]
    });
   }


   addNewUser(post){
    this.customer_name = post.customer_name;
    this.date = post.date; 
    this.plate_number = post.plate_number;
    this.reported_problem = post.reported_problem;
    this.remark = post.remark;
    this.car_type = post.car_type;
    this.person_in_charge = post.person_in_charge;

    var client:Client = {
      client_name : this.customer_name, 
      plate_number : this.plate_number, 
      date : this.date, 
      reported_problem : this.reported_problem, 
      remark : this.remark, 
      car_type: this.car_type, 
      person_in_charge : this.person_in_charge
    };

    this.clientService.addClient(client).
    subscribe(
      res => { console.log(res) }, 
      err => { console.log("Error occured")
    });
    

  }

  ngOnInit() {
  }

}
