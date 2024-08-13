import Link from 'next/link'
import React from 'react'

const AddMenu = () => {
  return (
    <>
      <div>
        <h1>Restaurants</h1>
        <h2>Please select restuarant</h2>
        <p>
          <Link href="/admin/addmenu/1">Chubbys</Link>
        </p>
        <p>
          <Link href="/admin/addmenu/2">Vuam</Link>
        </p>
        <p>
          <Link href="/admin/restaurants/addrestaurant">Add Restaurant</Link>
        </p>
      </div>
    </>
  )
}

export default AddMenu