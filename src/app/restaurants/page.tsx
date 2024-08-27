"use server";
import React from 'react'
import { Restaurant } from '../../classes/Restaurant';
import Link from 'next/link';
import { getRestaurants } from '../service/restaurant.service';


const fetchRestaurants = async () => {
  return await getRestaurants();
}

const Restaurants = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <div>
        <h1>Restaurants</h1>
      </div>
      <div>
        {
          restaurants?.map((restaurant: Restaurant) =>(
            <>
              <Link href={`/restaurants/${restaurant.id}`}>
                <div className="text-black border-black border-2">
                  <div>
                    {restaurant.business_name}
                  </div>
                  <div>
                    {restaurant.business_owner}
                  </div>
                </div>
                
              </Link>
            </>
          ))
        }
      </div>
    </>
  )
}

export default Restaurants
