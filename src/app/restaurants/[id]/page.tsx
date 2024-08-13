import { getRestaurant } from '@/app/service/restaurant.service'
import React from 'react'

const Restaurant = ({params}:{params: {id : string}}) => {
  console.log("loading restaurant info");
  console.log(params.id);
  const restaurant = getRestaurant(params.id);

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
            <div id="entrees">
              <h3>Entrees</h3>
              <div>
                <img src="/" />
                <h5>Description</h5>
                <p></p>
              </div>
            </div>
            <div id="drinks">
              <h4>Drinks</h4>
              <div>
                <img src="/" />
                <h5>Description</h5>
                <p></p>
              </div>
            </div>
            <div id="alacarte">
              <h4>A la Carte</h4>
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