import { Restaurant } from '@/app/classes/Restaurant'
import { getRestaurants } from '@/app/service/restaurant.service';
import Link from 'next/link'
import React from 'react'


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
              <Link href={{
                pathname: `/admin/restaurants/${restaurant.business_name}`,
                query: {
                  name: restaurant.business_name,
                  id: restaurant.id,
                },
              }}>
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
