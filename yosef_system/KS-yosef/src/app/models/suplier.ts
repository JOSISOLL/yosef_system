export class Suplier {
  constructor(
    name: string,
    email: string,
    address: string,
    country: string,
    phone: string,
    fax: string,
    website: string,
    manufacturer: string
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.country = country;
    this.phone = phone;
    this.fax = fax;
    this.website = website;
    this.manufacturer = manufacturer;
  }

  name: string;
  email: string;
  address: string;
  country: string;
  phone: string;
  fax: string;
  website: string;
  manufacturer: string;
}
