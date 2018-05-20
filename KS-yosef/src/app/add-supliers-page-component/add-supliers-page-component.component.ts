import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Suplier } from "../models/suplier";
import { SuplierService} from '../services/suplier.service';
import { ManufaturerService } from '../services/manufaturer.service';
import { Manufaturer } from '../models/manufaturer';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-supliers-page-component',
  templateUrl: './add-supliers-page-component.component.html',
  styleUrls: ['./add-supliers-page-component.component.css']
})
export class AddSupliersPageComponentComponent implements OnInit {
  myForm: FormGroup; 
  name: FormControl; 
  email: FormControl; 
  address: FormControl; 
  country: FormControl; 
  phone: FormControl; 
  fax: FormControl; 
  website:FormControl;

  manufacturers: Manufaturer[];
  selectedManufacturers: string[] = [];

  constructor(private _suplierService: SuplierService, private _manufaturerService: ManufaturerService, private location: Location) { }

  ngOnInit() {
    this.createControls(); 
    this.createForm();
    this.getManufacturers();

  }
  createControls(){
    this.name = new FormControl('', Validators.required); 
    this.email = new FormControl('', Validators.pattern("[^ @]*@[^ @]*.com")); 
    this.address = new FormControl(); 
    this.country = new FormControl(); 
    this.phone = new FormControl('', Validators.required); 
    this.fax = new FormControl(); 
    this.website = new FormControl(); 
  }
  createForm(){
    this.myForm = new FormGroup({
      name: this.name, 
      email: this.email, 
      address: this.address, 
      country: this.country, 
      phone: this.phone, 
      fax: this.fax, 
      website: this.website
    });
  }
  onSubmit(){
    console.log("submit button pressed");
    if(this.myForm.valid){
      var data = <Suplier>this.myForm.value;
      data.manufacturer = this.selectedManufacturers.join();
      console.log("FORM IS VALID");
      console.log(this.myForm.value);
      this._suplierService.add(data)
      .subscribe(customer => {
        console.log("saved data");
      });
      this.location.back();

    }
    else{
      console.log("Form is invalid");
    }
  }
  getManufacturers() : void{
    this._manufaturerService.getManufacturers()
    .subscribe(manufacturers => this.manufacturers = manufacturers);
  }

  checkBoxChange(e, manufacturer){
    if(e.target.checked){
      this.addSelectedManufacturer(manufacturer);
      //console.log("SELECTED: " + manufacturer);
    }
    else{
      this.removeSelectedManufacturer(manufacturer);
      // console.log("UN SELECTED: " + manufacturer);
    }
    console.log(this.selectedManufacturers.join());
  }

  addSelectedManufacturer(manufactuer: string){
    this.selectedManufacturers.push(manufactuer);
  }
  removeSelectedManufacturer(manufactuer: string){
    var index : number = this.selectedManufacturers.indexOf(manufactuer);
    if(index != -1){
      this.selectedManufacturers.splice(index, 1);
    }
  }
  click_backButton(){
    this.location.back();
  }
}
