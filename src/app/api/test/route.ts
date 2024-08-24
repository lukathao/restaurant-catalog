"use server";

import { getMonthlyTotal } from "@/app/service/subscription.servce";
import { NextResponse } from "next/server";

export async function GET() {
  const total = getMonthlyTotal();
  return NextResponse.json({
    total: total,
  });
}
