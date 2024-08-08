"use client";

import React, { useState } from 'react'

const defaultRestaurantFormData = { 
  restaurantName: "",
  restaurantOwner: "",
  restaurantAddress: "",
  isActive: "",
  street: "", 
  city: "",
  state: "", 
  zipCode: "",
};

const AddRestaurant = () => {
  const [formData, setFormData] = useState(defaultRestaurantFormData);
  const {
    restaurantName,
    restaurantOwner,
    isActive,
    street, 
    city,
    state, 
    zipCode,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(FormData)
    setFormData(defaultRestaurantFormData);
  };

  return (
    <>
      <div>
        <h1>Add Restaurant</h1>
        <form onSubmit={handleSubmitForm}>
          <div id="restaurantName">
            <label>Business Name</label><br />
            <input 
              type="text" 
              name="restaurantName" 
              className="w-96 text-black border-black border-2" 
              required 
              value={restaurantName}
              onChange={onChange}
              />
          </div>
          <div id="restaurantOwner">
            <label>Owner</label><br />
            <input 
              type="text" 
              name="restaurantOwner" 
              className="w-96 text-black border-black border-2" 
              required 
              value={restaurantOwner}
              onChange={onChange}
              />
          </div>
          <div id="restaurantAddress">
            <div>
              <label>Street Address</label><br />
              <input 
                type="text" 
                name="streetAddress" 
                className="w-96 text-black border-black border-2" 
                required 
                value={street}
                onChange={onChange}
                />
            </div>
            <div>
              <label>City</label><br />
              <input 
                type="text" 
                name="city" 
                className="w-96 text-black border-black border-2" 
                required 
                value={city}
                onChange={onChange}
                />
            </div>
            <div>
              <label>State</label><br />
              <select name="state" required>
                <option value={state}>Wisconsin</option>
              </select>
            </div>
            <div>
              <label>Zipcode</label>
              <input 
                type="text" 
                name="zipCode" 
                className="w-48 text-black border-black border-2" 
                required 
                value={zipCode}
                onChange={onChange}
                />
            </div>
          </div>
          <div id="isActive">
            <fieldset>
              <legend>Active</legend>
              <div>
                <input type="radio" id="yes" name="isActive" value={isActive} />
                <label for="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="no" name="isActive" value={isActive} />
                <label for="no">No</label>
              </div>
            </fieldset>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddRestaurant