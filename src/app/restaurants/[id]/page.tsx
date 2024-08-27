"Use client";

import React from 'react'

const Restaurant = async ({params}:{params: {id : string}}) => {
  const fetchUrl = "http://localhost:3000/api/menu/"+params.id;
  const restaurantItems = await fetch(fetchUrl);
  
  console.log(restaurantItems);

  return (
    <>
      <div>
        <div>
          <div>
            Restaurant ID: {params.id}
            {/* <h1>{restaurant.business_name}</h1>
            <h2>{restaurant.business_owner}</h2> */}
          </div>
          <h2>Menu</h2>
          <div>
            <div id="appetiziers">
              <h3>Appetizers</h3>
              <div>
                <img src="/" />
                <h5>Description</h5>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Restaurant