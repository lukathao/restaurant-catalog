"use server";
import { Restaurant } from "@/classes/Restaurant";
import { saveRestaurant } from "@/app/service/restaurant.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const restaurant = new Restaurant(
      "",
      data["restaurantName"],
      data["restaurantOwner"],
      data["street"],
      data["city"],
      data["state"],
      data["zipCode"],
    );
    const res = await saveRestaurant(restaurant);
    // TODO null check
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

export async function PUT() {
  //UPDATE A RESTAURANT
}
