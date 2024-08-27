"use server";

import { Menu } from "@/app/classes/Menu";
import { getMenuItems, saveMenuItem } from "@/app/service/menu.service";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, context: { params: { id: string } }) {
  'use server'
  const { id } = context.params;
  const menuItems = await getMenuItems(id);
  return NextResponse.json({
    message: "Items",
    headers: {
      "Content-Type" : "application/json",
    },
    items: menuItems,
    status: 201,
  });
}
