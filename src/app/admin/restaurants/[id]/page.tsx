"use client";

import { getRestaurant } from '@/app/service/restaurant.service'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


type MenuData = {
  restaurantId: String,
  itemName: String,
  itemDescription: String,
  itemType: String,
  itemPrice: String,
}

const RestaurantAdmin = async ({params}:{params: {id : string}}) => {
  const restaurant = await getRestaurant(params.id);
  const { register, handleSubmit, formState: {errors, isSubmitting}, setValue, watch, reset } = useForm<MenuData>({
    reValidateMode: "onSubmit",
  });
  const [ loading, setLoading] = useState(false);

  const submit= async (menuData : MenuData) => {
    menuData.restaurantId = params.id;
    try {
      const response = await fetch('/api/restaurants', {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(menuData),
      });
      if (response) {
        const data = await response.json();
        console.log("Submitted Data");
        console.log(data);
      };
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // reset();
    }
  };
  
  return (
    <>
      <div>
        <div>
          <div>
            <h1>{restaurant["business_name"]}</h1>
            <h2>{restaurant["business_owner"]}</h2>
          </div>
          <div>
            <form 
            className="flex max-w-[350px] flex-col gap-5 rounded bg-white p-5"
            onSubmit={handleSubmit(submit)}
            >
              <div id="itemName" className="flex flex-col">
                <label>Item Name</label>
                <input 
                  type="text"
                  className="w-96 text-black border-black border-2"
                  {...register("itemName", {
                    required: "Invalid item name", 
                    minLength: {
                      value: 1,
                      message: "Item name is too short"
                  }})}
                  />
                  {errors.itemName && (<p className="text-red-500">{errors.itemName.message}</p>)}
              </div>
              <div id="itemDescription" className="flex flex-col">
                <label>Description</label>
                <textarea 
                  className="w-96 text-black border-black border-2" 
                  rows={4}
                  {...register("itemDescription", {
                    required: "Invalid description", 
                    minLength: {
                      value: 2,
                      message: "Description is too short"
                    }})}
                  />
                  {errors.itemDescription && (<p className="text-red-500">{errors.itemDescription.message}</p>)}
              </div>
              <div className="flex flex-col">
                <label>Price</label>
                <input 
                  type="number" 
                  className="w-96 text-black border-black border-2"
                  min={0}
                  {...register("itemPrice", {
                    required: "Invalid price"
                  })}
                  />
                  {errors.itemPrice && (<p className="text-red-500">{errors.itemPrice.message}</p>)}
              </div>
              <div>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantAdmin
