export class Menu {
  id: string;
  business_id: string;
  item_name: string;
  item_description: string;
  item_type: string;
  price: number;
  file: File;

  public constructor(id: string, business_id: string, item_name: string, item_description: string, item_type: string, price: number, file: File) {
    this.id = id;
    this.business_id = business_id
    this.item_name = item_name;
    this.item_description = item_description;
    this.item_type = item_type;
    this.price = price;
    this.file = file;
  }
}