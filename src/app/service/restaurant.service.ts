"use server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";
import { Restaurant } from "../classes/Restaurant";
//TODO implement this in graphQL (future implementation)

export async function getNeonDbPool() {
  return new Pool({connectionString: process.env.DATABASE_URL});
}

export async function getRestaurants() {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `select * from restaurants`
  , []);
  try {
    pool.connect();
    const { rows, rowCount } = await pool.query(sql);
    if (rowCount == null || rowCount == 0) {
      return null;
    }
    return rows;    
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    pool.end();
  }
}

export async function getRestaurant(id: String) {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `select * from restaurants
    where restaurants.id = ?`
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

export async function saveRestaurant(restaurant: Restaurant) {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `insert into restaurants (id, business_name, business_owner, address_street, address_city, address_state, address_zipcode, is_active, created_at, updated_at)
    values (gen_random_uuid (), ?, ?, ?, ?, ?, ?, true, now(), NULL)`
  , [restaurant.business_name, restaurant.business_owner, restaurant.address_street, restaurant.address_city, restaurant.address_state, restaurant.address_zipcode])
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
