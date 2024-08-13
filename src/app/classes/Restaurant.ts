export class Restaurant {
  id: String;
  business_name: String;
  business_owner: String;
  address_street: String;
  address_city: String;
  address_state: String;
  address_zipcode: String;

  public constructor(id: String, name: String, owner: String, street: String, city: String, state: String, zipCode: String) {
    this.id = id;
    this.business_name = name;
    this.business_owner = owner;
    this.address_street = street;
    this.address_city = city;
    this.address_state = state;
    this.address_zipcode = zipCode;
  }
}
