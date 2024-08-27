"use server";

import { Menu } from "@/app/classes/Menu";
import { getMenuItems, saveMenuItem } from "@/app/service/menu.service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const menuItem = new Menu(
      "",
      data["restaurantId"],
      data["itemName"],
      data["itemDescription"],
      data["itemType"],
      data["itemPrice"],
      data["itemImage"],
    );

    const res = await saveMenuItem(menuItem);
    return NextResponse.json({
      message: "Saved Restaurant",
      headers: {
        "Content-Type" : "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error attempting to create restaurant.",
      headers: {
        "Content-Type" : "application/json",
      },
      status: 500,
    });
  } 
}
