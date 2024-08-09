import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("inside get request");
  return NextResponse.json({
    hello: "world",
  });
}

export async function POST(request: NextRequest) {
  console.log("inside post request");
  const data = await request.json();
  return NextResponse.json({
    data,
    headers: {
      "Content-Type" : "application/json",
    },
    status: 201,
  });
  //CREATE A RESTAURANT
}

export async function PUT() {
  //UPDATE A RESTAURANT
}
