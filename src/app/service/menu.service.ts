"use server";

import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";
import { Menu } from "../classes/Menu";

export async function getNeonDbPool() {
  return new Pool({connectionString: process.env.DATABASE_URL});
}

export async function getRestaurantMenu(id: string) {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `select * from menus
    where menus.restaurant_id = ?`
  , [id]);
  try {
    pool.connect();
    const { rows, rowCount } = await pool.query(sql);
    if (rowCount == null || rowCount == 0) {
      return null;
    }
    return rows[0]; 
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    pool.end();
  }
}

export async function saveMenuItem(menu: Menu) {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `insert into menus (id, business_id, item_name, item_description, item_type, item_price, is_active, created_at, updated_at)
    values (gen_random_uuid (), ?, ?, ?, ?, ?, true, now(), NULL)`
  , [menu.business_id, menu.item_name, menu.item_description, menu.item_type, menu.price]);
  try {
    console.log(sql);
    pool.connect();
    const res = await pool.query(sql);
    return res;    
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    pool.end();
  }
}
