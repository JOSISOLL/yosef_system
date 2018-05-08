import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClientService }  from '../client.service';
import { Client } from '../models/client';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  myForm:FormGroup; 
  
  name: FormControl; 
  email: FormControl; 
  telMobile: FormControl; 
  telHome: FormControl; 
  telWork: FormControl; 
  address: FormControl; 
  
  constructor(private _customerService: CustomerService) {
  }

  createControls(){
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.pattern("[^ @]*@[^ @]*.com"));
    this.telMobile = new FormControl('', Validators.pattern("[\+]2519{1}[0-9]{8}"));
    this.telHome = new FormControl('', Validators.pattern("[\+]251{1}[0-9]{9}"));
    this.telWork = new FormControl('', Validators.pattern("[\+]251{1}[0-9]{9}"));
    this.address = new FormControl();
  }
  createForm(){
    this.myForm = new FormGroup({
      name: this.name, 
      email: this.email, 
      telMobile: this.telMobile, 
      telHome: this.telHome, 
      telWork: this.telWork, 
      address: this.address
    })
  }
  
  ngOnInit() {
    this.createControls(); 
    this.createForm();
  }
  onSubmit(){
    if(this.myForm.valid){
      var data = <Customer>this.myForm.value;
      console.log("FORM IS VALID");
      console.log(this.myForm.value);
      this._customerService.add(data)
      .subscribe(customer => {
        console.log("saved data");
      });
    }
    else{
      console.log("FROM IS INVALID");
    }
  }
}
