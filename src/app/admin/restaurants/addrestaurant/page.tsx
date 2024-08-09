"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


type RestaurantData = {
  restaurantName: String,
  restaurantOwner: String,
  restaurantAddress: String,
  isActive: Boolean,
  street: String, 
  city: String,
  state: String, 
  zipCode: String,
}

const AddRestaurant = () => {

  const { register, handleSubmit, formState: {errors, isSubmitting}, setValue, watch, reset } = useForm<RestaurantData>({
    reValidateMode: "onSubmit",
  });
  const [ loading, setLoading] = useState(false);

  const watchRestaurantOwner = watch("restaurantOwner");
  const watchCity = watch("city");
  useEffect(() => {
    if(watchRestaurantOwner) {
      setValue("restaurantOwner",
        watchRestaurantOwner.charAt(0).toUpperCase() + watchRestaurantOwner.slice(1),
      );
    }
    if(watchCity) {
      setValue("city",
        watchCity.charAt(0).toUpperCase() + watchCity.slice(1),
      );
    }
  }, [watchRestaurantOwner, watchCity, setValue]);

  const submit= async (restaurantType : RestaurantData) => {
    console.log("Submitting Data");
    try {
      const response = await fetch('/api/restaurants', {
        headers: {
          Accept: "application/json",
          method: "POST",
        },
      });
      if (response) {
        const data = await response.json();
        console.log("Submitted Data");
        console.log(data);
      }
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
        <h1>Add Restaurant</h1>
        <form 
        className="flex max-w-[350px] flex-col gap-5 rounded bg-white p-5"
        onSubmit={handleSubmit(submit)}
        >
          <div id="restaurantName" className="flex flex-col">
            <label>Restaurant Name</label>
            <input 
              type="text"
              className="w-96 text-black border-black border-2"
              {...register("restaurantName", {
                required: "Invalid restaurant name", 
                minLength: {
                  value: 1,
                  message: "Restaurant name is too short"
              }})}
              />
              {errors.restaurantName && (<p className="text-red-500">{errors.restaurantName.message}</p>)}
          </div>
          <div id="restaurantOwner" className="flex flex-col">
            <label>Owner</label>
            <input 
              type="text" 
              className="w-96 text-black border-black border-2" 
              {...register("restaurantOwner", {
                required: "Invalid owner name", 
                minLength: {
                  value: 2,
                  message: "Owner name is too short"
                }})}
              />
              {errors.restaurantOwner && (<p className="text-red-500">{errors.restaurantOwner.message}</p>)}
          </div>

          <div className="flex flex-col">
            <label>Street Address</label>
            <input 
              type="text" 
              className="w-96 text-black border-black border-2" 
              {...register("street", {
                required: "Invalid street address", 
                minLength: {
                  value: 3,
                  message: "Street name is too short"
                }})}
              />
              {errors.street && (<p className="text-red-500">{errors.street.message}</p>)}
          </div>
          <div className="flex flex-col">
            <label>City</label>
            <input 
              type="text" 
              className="w-96 text-black border-black border-2" 
              {...register("city", {
                required: "Invalid city", 
                minLength: {
                  value: 2,
                  message: "City name is too short"
                }})}
              />
              {errors.city && (<p className="text-red-500">{errors.city.message}</p>)}
          </div>
          <div className="w-10 flex flex-col">
            <label>State</label>
            <select {...register("state", {required: "Please select a valid state", minLength: 2})}>
              <option>WI</option>
            </select>
            {errors.state && (<p className="text-red-500">{errors.state.message}</p>)}
          </div>
          <div className="flex flex-col">
            <label>Zipcode</label>
            <input 
              type="text" 
              className="w-48 text-black border-black border-2" 
              {...register("zipCode", {
                required: "Invalid zipcode", 
                minLength: {
                  value: 5,
                  message: "Zipcode is too short"
                }})}
              />
              {errors.zipCode && (<p className="text-red-500">{errors.zipCode.message}</p>)}
          </div>

          <div id="isActive" className="flex flex-col">
            <fieldset>
              <legend>Active</legend>
              <div>
                <input type="radio" {...register("isActive", {required: "Please select a choice", minLength: 1})} value="True" />Yes
              </div>
              <div>
                <input type="radio" {...register("isActive", {required: "Please select a choice", minLength: 1})} value="False" />No
              </div>
            </fieldset>
            {errors.isActive && (<p className="text-red-500">{errors.isActive.message}</p>)}
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
    </>
  )
}

export default AddRestaurant