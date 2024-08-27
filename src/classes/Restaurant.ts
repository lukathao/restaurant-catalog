export class Restaurant {
  id: string;
  business_name: string;
  business_owner: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;

  public constructor(id: string, name: string, owner: string, street: string, city: string, state: string, zipCode: string) {
    this.id = id;
    this.business_name = name;
    this.business_owner = owner;
    this.address_street = street;
    this.address_city = city;
    this.address_state = state;
    this.address_zipcode = zipCode;
  }
}
