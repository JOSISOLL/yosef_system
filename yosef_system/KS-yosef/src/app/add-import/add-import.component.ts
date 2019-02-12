import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Import } from "../models/import";
import { PartsService } from "../services/parts.service";
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
=======
import { Router } from "@angular/router";
>>>>>>> add-excel-import

@Component({
  selector: "app-add-import",
  templateUrl: "./add-import.component.html",
  styleUrls: ["./add-import.component.css"]
})
export class AddImportComponent implements OnInit {
  public myForm: FormGroup;

<<<<<<< HEAD
  public myForm : FormGroup;
  

  constructor(private _toast : ToastrService ,private _fb : FormBuilder, private _partService : PartsService, private _router : Router) { }
=======
  constructor(
    private _fb: FormBuilder,
    private _partService: PartsService,
    private _router: Router
  ) {}
>>>>>>> add-excel-import

  ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
      import_date: ["", [Validators.required]],
      items: this._fb.array([this.initAddress()])
    });
  }

<<<<<<< HEAD
initAddress() {
        // initialize our address
        return this._fb.group({
          partNumber : ['', Validators.required],
          stamp : ['', Validators.required],
          description : [''],
          remark : [''],
          quantity : ['', Validators.required],
          foreign_unit_cost : ['', Validators.required],
          foreign_total : ['', Validators.required],
          local_cost : ['', Validators.required],
          local_total : ['', Validators.required],
          origin : ['', Validators.required],
          factory_cost : ['', Validators.required],
          price : ['']
        });
    }
=======
  initAddress() {
    // initialize our address
    return this._fb.group({
      part_number: ["", Validators.required],
      stamp: ["", Validators.required],
      description: [""],
      remark: [""],
      imported_quantity: ["", Validators.required],
      foreign_unit_cost: ["", Validators.required],
      foreign_total: ["", Validators.required],
      local_cost: ["", Validators.required],
      local_total: ["", Validators.required],
      origin: ["", Validators.required],
      factory_cost: ["", Validators.required],
      price: [""]
    });
  }
>>>>>>> add-excel-import

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls["items"];
    control.push(this.initAddress());
<<<<<<< HEAD
    
    
}
=======
  }
>>>>>>> add-excel-import

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls["items"];
    control.removeAt(i);
<<<<<<< HEAD
}
save(model) {
  let grandTotal = 0
  model.value.items.forEach(item => {
    this._partService.addImportedParts(item)
    .subscribe(
      res =>{
        console.log("Item added to imported parts")
        console.log(res)
      }, err => {
        console.log(err)
      }
    )
    grandTotal += item.local_total 
      
  });
  console.log(grandTotal)
  model.value.grandTotal = grandTotal;
  this._partService.addImport(model.value)
  .subscribe(
    res =>{
      this._toast.success('Added', 'Items added successfully')
      console.log("Import Added.");
      this._router.navigate(['/import']);
    },
    err =>{
      console.log(err);
      this._toast.error(err, 'Error')
    }

  )
}

=======
  }
  save(model) {
    this._partService.addImport(model.value).subscribe(
      res => {
        this._router.navigate(["/import"]);
      },
      err => {
        console.log(err);
      }
    );
  }
>>>>>>> add-excel-import
}
