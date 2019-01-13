import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Suplier } from "../models/suplier";
import { SuplierService } from "../services/suplier.service";
import { ManufaturerService } from "../services/manufaturer.service";
import { Manufaturer } from "../models/manufaturer";
import { Location } from "@angular/common";
@Component({
  selector: "app-add-supliers-page-component",
  templateUrl: "./add-supliers-page-component.component.html",
  styleUrls: ["./add-supliers-page-component.component.css"]
})
export class AddSupliersPageComponentComponent implements OnInit {
  myForm: FormGroup;
  name: FormControl;
  email: FormControl;
  address: FormControl;
  country: FormControl;
  phone: FormControl;
  fax: FormControl;
  website: FormControl;

  manufacturers: Manufaturer[];
  selectedManufacturers: string[] = [];

  constructor(
    private _suplierService: SuplierService,
    private _manufaturerService: ManufaturerService,
    private location: Location
  ) {}

  ngOnInit() {
    this.createControls();
    this.createForm();
    this.getManufacturers();
    this.importButtonClick();
  }
  createControls() {
    this.name = new FormControl("", Validators.required);
    this.email = new FormControl("", Validators.pattern("[^ @]*@[^ @]*.com"));
    this.address = new FormControl();
    this.country = new FormControl();
    this.phone = new FormControl("", Validators.required);
    this.fax = new FormControl();
    this.website = new FormControl();
  }
  createForm() {
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
  onSubmit() {
    console.log("submit button pressed");

    if (this.myForm.valid) {
      var data = <Suplier>this.myForm.value;

      data.manufacturer = this.selectedManufacturers.join();
      console.log("FORM IS VALID");
      console.log(this.myForm.value);
      this._suplierService.add(data).subscribe(customer => {
        console.log("saved data");
      });
      this.location.back();
    } else {
      console.log("Form is invalid");
    }
  }
  getManufacturers(): void {
    this._manufaturerService
      .getManufacturers()
      .subscribe(manufacturers => (this.manufacturers = manufacturers));
  }

  checkBoxChange(e, manufacturer) {
    if (e.target.checked) {
      this.addSelectedManufacturer(manufacturer);
      //console.log("SELECTED: " + manufacturer);
    } else {
      this.removeSelectedManufacturer(manufacturer);
      // console.log("UN SELECTED: " + manufacturer);
    }
    console.log(this.selectedManufacturers.join());
  }

  addSelectedManufacturer(manufactuer: string) {
    this.selectedManufacturers.push(manufactuer);
  }
  removeSelectedManufacturer(manufactuer: string) {
    var index: number = this.selectedManufacturers.indexOf(manufactuer);
    if (index != -1) {
      this.selectedManufacturers.splice(index, 1);
    }
  }
  click_backButton() {
    this.location.back();
  }

  importButtonClick() {
    var suplierObjects: Suplier[] = [
      {
        name: "Suplier-1",
        email: "email-1",
        address: "address-1",
        country: "country -1",
        phone: "phone-1",
        fax: "fax-1",
        website: "website-1",
        manufacturer: "manufacturer-1"
      },
      {
        name: "Suplier-2",
        email: "email-2",
        address: "address-2",
        country: "country -2",
        phone: "phone-2",
        fax: "fax-2",
        website: "website-2",
        manufacturer: "manufacturer-2"
      },
      {
        name: "Suplier-3",
        email: "email-3",
        address: "address-3",
        country: "country -3",
        phone: "phone-3",
        fax: "fax-3",
        website: "website-3",
        manufacturer: "manufacturer-3"
      },
      {
        name: "Suplier-4",
        email: "email-4",
        address: "address-4",
        country: "country -4",
        phone: "phone-4",
        fax: "fax-4",
        website: "website-4",
        manufacturer: "manufacturer-4"
      },
      {
        name: "Suplier-5",
        email: "email-5",
        address: "address-5",
        country: "country -5",
        phone: "phone-5",
        fax: "fax-5",
        website: "website-5",
        manufacturer: "manufacturer-5"
      },
      {
        name: "Suplier-6",
        email: "email-6",
        address: "address-6",
        country: "country -6",
        phone: "phone-6",
        fax: "fax-6",
        website: "website-6",
        manufacturer: "manufacturer-6"
      },
      {
        name: "Suplier-7",
        email: "email-7",
        address: "address-7",
        country: "country -7",
        phone: "phone-7",
        fax: "fax-7",
        website: "website-7",
        manufacturer: "manufacturer-7"
      },
      {
        name: "Suplier-8",
        email: "email-8",
        address: "address-8",
        country: "country -8",
        phone: "phone-8",
        fax: "fax-8",
        website: "website-8",
        manufacturer: "manufacturer-8"
      },
      {
        name: "Suplier-9",
        email: "email-9",
        address: "address-9",
        country: "country -9",
        phone: "phone-9",
        fax: "fax-9",
        website: "website-9",
        manufacturer: "manufacturer-9"
      },
      {
        name: "Suplier-10",
        email: "email-10",
        address: "address-10",
        country: "country -10",
        phone: "phone-10",
        fax: "fax-10",
        website: "website-10",
        manufacturer: "manufacturer-10"
      },
      {
        name: "Suplier-11",
        email: "email-11",
        address: "address-11",
        country: "country -11",
        phone: "phone-11",
        fax: "fax-11",
        website: "website-11",
        manufacturer: "manufacturer-11"
      },
      {
        name: "Suplier-12",
        email: "email-12",
        address: "address-12",
        country: "country -12",
        phone: "phone-12",
        fax: "fax-12",
        website: "website-12",
        manufacturer: "manufacturer-12"
      },
      {
        name: "Suplier-13",
        email: "email-13",
        address: "address-13",
        country: "country -13",
        phone: "phone-13",
        fax: "fax-13",
        website: "website-13",
        manufacturer: "manufacturer-13"
      },
      {
        name: "Suplier-14",
        email: "email-14",
        address: "address-14",
        country: "country -14",
        phone: "phone-14",
        fax: "fax-14",
        website: "website-14",
        manufacturer: "manufacturer-14"
      },
      {
        name: "Suplier-15",
        email: "email-15",
        address: "address-15",
        country: "country -15",
        phone: "phone-15",
        fax: "fax-15",
        website: "website-15",
        manufacturer: "manufacturer-15"
      },
      {
        name: "Suplier-16",
        email: "email-16",
        address: "address-16",
        country: "country -16",
        phone: "phone-16",
        fax: "fax-16",
        website: "website-16",
        manufacturer: "manufacturer-16"
      },
      {
        name: "Suplier-17",
        email: "email-17",
        address: "address-17",
        country: "country -17",
        phone: "phone-17",
        fax: "fax-17",
        website: "website-17",
        manufacturer: "manufacturer-17"
      },
      {
        name: "Suplier-18",
        email: "email-18",
        address: "address-18",
        country: "country -18",
        phone: "phone-18",
        fax: "fax-18",
        website: "website-18",
        manufacturer: "manufacturer-18"
      }
    ];
    suplierObjects.forEach(element => {
      console.log(element);
      this._suplierService.add(element).subscribe(customer => {
        console.log("saved data");
      });
    });
  }
}
