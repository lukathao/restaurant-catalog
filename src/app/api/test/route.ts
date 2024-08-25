"use server";

import { createTestWithActiveUsers, createTestWithNoActiveUsers } from "@/app/service/subservice.service";
import { NextResponse } from "next/server";

export async function GET() {
  const total = createTestWithNoActiveUsers();
  return NextResponse.json({
    total: total,
  });
}
