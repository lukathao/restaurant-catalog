import { MenuItemsEnum } from "@/app/enums/MenuItems.enums";
import { MenuItems } from "@/interfaces/MenuItems.interface";

//sort items into different lists based on type
export function getCategoryOfItems(items: MenuItems[], type: String) {
  return items.filter(item => {
    return item.item_type == type;
  });
}

//gets the list of types
export function getListOfTypes(items: MenuItems[]) {
  let types = new Set();
  items.forEach(item => {
    types.add(item);
  });
  return types;
}

