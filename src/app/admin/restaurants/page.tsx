import Link from 'next/link'
import React from 'react'

const Restaurants = () => {
  return (
    <div>
      <h1>Restaurants</h1>
      <div id="restaurantList">
        None yet.
      </div>
      <div id="Links">
        <Link href="/admin/restaurants/addrestaurant">Add Restaurant</Link>
      </div>
    </div>
  )
}

export default Restaurants