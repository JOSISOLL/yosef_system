import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Import } from "../models/import";

@Component({
  selector: 'app-add-import',
  templateUrl: './add-import.component.html',
  styleUrls: ['./add-import.component.css']
})
export class AddImportComponent implements OnInit {

  public myForm : FormGroup;

  constructor(private _fb : FormBuilder) { }

  ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
            date: ['', [Validators.required]],
            items: this._fb.array([
                this.initAddress(),
            ])
        });
    }

initAddress() {
        // initialize our address
        return this._fb.group({
          part_number : ['', Validators.required],
          stamp : ['', Validators.required],
          description : [''],
          imported_quantity : ['', Validators.required],
          foreign_unit_cost : ['', Validators.required],
          foreign_total : ['', Validators.required],
          local_cost : ['', Validators.required],
          local_total : ['', Validators.required],
          origin : ['', Validators.required],
          factory_cost : ['', Validators.required],
          price : ['']
        });
    }

addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['items'];
    control.push(this.initAddress());
}

removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['items'];
    control.removeAt(i);
}
save(model) {
  // call API to save customer
  console.log(model.value);
}

}
