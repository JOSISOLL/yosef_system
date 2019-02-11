import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../models/customer';
import { RepairService } from '../repair.service';
import { Repair } from '../models/repair';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  selectedClientName: any = null; 
  selectedClientEmail: any = null; 
  selectedClientMobileTel: any = null; 
  selectedClientHomeTel: any = null; 
  selectedClientWorkTel: any = null; 
  selectedClientAddress: any = null;
  selectedClientId:any = null;

  myForm: FormGroup; 
  id: FormControl;
  name: FormControl; 
  email: FormControl;
  telMobile: FormControl; 
  telHome: FormControl; 
  telWork: FormControl; 
  address: FormControl; 


  repairForm: FormGroup;
  customer: FormControl; 
  plateNumber: FormControl; 
  reportedProblem: FormControl; 
  carType: FormControl; 
  remark: FormControl; 
  personInCharge: FormControl; 
  date: FormControl;

  constructor(private _toast : ToastrService, private _clientService: ClientService, private _router: Router, private _repairService: RepairService) { 
    
  }
  ngOnInit() {
    this.createControls(); 
    this.createEditForm();
    this.createRepairControl()
    this.createRepairForm()
    this.getCustomers();
    
      
  }
  getCustomers(){
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
  // TODO: create a reactive form for validation before saving the update.
  btn_editClientClick(client){
    this.selectedClient = client;
    
    this.myForm.setValue({
      id: client._id,
      name: client.name,
      email: client.email, 
      telMobile: client.telMobile, 
      telHome: client.telHome,
      telWork: client.telWork, 
      address: client.address
    });
    // this.selectedClientId = client._id;
    // this.selectedClientName = client.name; 
    // this.selectedClientEmail = client.email; 
    // this.selectedClientMobileTel = client.telMobile; 
    // this.selectedClientHomeTel = client.telHome; 
    // this.selectedClientWorkTel = client.telWork; 
    // this.selectedClientAddress = client.address;
    $('#modal-edit').modal('show'); 
    console.log("show edit client clicked");
  }
  btn_deleteClientClick(client){
    console.log("TAG: customer-main.component.ts");
    console.log(client);
    this.selectedClient = client;
    this.selectedClient.id = client._id;
    $('#modal-delete').modal('show');
    console.log("show delete client clicked"); 
  }
  btn_addRepariClick(client){
    this.selectedClient = client;
    console.log(client)
    this.repairForm.setValue({
      customer: client.name,
      plateNumber:"",
      reportedProblem:"",
      carType:"",
      remark: "",
      personInCharge: "",
      date: ""
    });
    // this.selectedClientId = client._id;
    // this.selectedClientName = client.name; 
    // this.selectedClientEmail = client.email; 
    // this.selectedClientMobileTel = client.telMobile; 
    // this.selectedClientHomeTel = client.telHome; 
    // this.selectedClientWorkTel = client.telWork; 
    // this.selectedClientAddress = client.address;

    $('#modal-add-repair').modal('show'); 
    console.log("add repair for client clicked");
  }

  deleteCustomer(){
    this._clientService.deleteCustomer(this.selectedClient)
    .subscribe(result => {
      this._toast.error('Delete', "Successfully Deleted");
      console.log("successfully deleted!");
      let selectedIndex = this.clients.indexOf(this.selectedClient);
      console.log("selected index: " + selectedIndex);
      // delete this.clients[selectedIndex];
      this.getCustomers();
      $('#modal-delete').modal('hide');
    });
  }

  saveUpdates(){
    console.log("submit clicked..");
    if(this.myForm.valid){
      var data = <Customer> this.myForm.value; 
      this.selectedClient.name = data.name; 
      this.selectedClient.email = data.email; 
      this.selectedClient.telMobile = data.telMobile; 
      this.selectedClient.telHome = data.telHome; 
      this.selectedClient.telWork = data.telWork; 
      this.selectedClient.address = data.address;
      console.log("saving edited customer detail...");
      console.log(data);
      this._clientService.updateClient(data)
      .subscribe(result => {
        this._toast.success('Updated', "Customer Info Updated");
        console.log(result);
        $("#modal-edit").modal('hide');
      });
     }
    // var client_ = new Customer(); 
    // client_.id = this.selectedClientId; 
    // client_.name = this.selectedClientName; 
    // client_.email = this.selectedClientEmail; 
    // client_.telMobile = this.selectedClientMobileTel; 
    // client_.telHome = this.selectedClientHomeTel; 
    // client_.telWork = this.selectedClientWorkTel; 
    // client_.address = this.selectedClientAddress; 
    
  }


  createControls(){
    this.id = new FormControl();
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.pattern("[^ @]*@[^ @]*.com"));
    this.telMobile = new FormControl('', Validators.pattern("[\+]2519{1}[0-9]{8}"));
    this.telHome = new FormControl('', Validators.pattern("[\+]251{1}[0-9]{9}"));
    this.telWork = new FormControl('', Validators.pattern("[\+]251{1}[0-9]{9}"));
    this.address = new FormControl();
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id: this.id,
      name: this.name, 
      email: this.email, 
      telMobile: this.telMobile, 
      telHome: this.telHome, 
      telWork: this.telWork, 
      address: this.address
    });
  }

createRepairControl(){
  this.customer = new FormControl('', Validators.required);
  this.plateNumber = new FormControl();
  this.reportedProblem = new FormControl();
  this.carType = new FormControl();
  this.remark = new FormControl();
  this.personInCharge = new FormControl();
  this.date = new FormControl();
}
createRepairForm(){
  this.repairForm = new FormGroup({
    customer: this.customer, 
    plateNumber: this.plateNumber, 
    reportedProblem: this.reportedProblem, 
    carType: this.carType, 
    remark: this.remark, 
    personInCharge: this.personInCharge,
    date: this.date
  })

}
repairAdd(){
  console.log("submit clicked..");
  if(this.repairForm.valid){

    // console.log("Form is VALID")
    var data = <Repair>this.repairForm.value;
    console.log("FORM IS VALID");
    // console.log(this.repairForm.value);
    this._repairService.addRepair(data)
    .subscribe(
      res => {
        console.log(res)
        this._toast.success("Repair added successfully", "Repair");
        this._router.navigate(['/repair'])
        $("#modal-add-repair").modal('hide');
      },
      err => {
        this._toast.error(err)
        console.log(err)
      }
    )
  }
  else{
    this._toast.error("Form is Invalid", "Error")
    console.log("FROM IS INVALID");
  }
  }
  


}
