"use client";

import { useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const RestaurantMenuAdmin = () => {
  type MenuData = {
    restaurantId: string,
    itemName: string,
    itemDescription: string,
    itemType: string,
    itemPrice: string,
    itemImage: File,
  }

  const { register, handleSubmit, formState: {errors, isSubmitting}, setValue, watch, reset } = useForm<MenuData>({
    reValidateMode: "onSubmit",
  });
  const [ loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('id');
  const restaurantName = searchParams.get('name');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      console.log(event.target.files)
      const file = event.target.files[0] == null? null : event.target.files[0];
      if (!file) {
        setSelectedFile(file);
      }
    }
  }

  const submit= async (menuData : MenuData) => {
    menuData.restaurantId = restaurantId == null ? "null" : restaurantId;
    try {
      const response = await fetch('/api/menu/item', {
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
      reset();
    }
  };
  
  return (
    <>
      <div>
        <div>
          <div>
            <h1>{restaurantName}</h1>
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
              <div className="w-100 flex flex-col">
                <label>Type</label>
                <select {...register("itemType", {required: "Please select a valid item type", minLength: 2})}>
                  <option>Appetizer</option>
                  <option>Entree</option>
                  <option>Drink</option>
                  <option>A la carte</option>
                  <option>Others</option>
                </select>
                {errors.itemType && (<p className="text-red-500">{errors.itemType.message}</p>)}
              </div>
              <div className="flex flex-col">
                <label>Price</label>
                <input 
                  type="number" 
                  className="w-96 text-black border-black border-2"
                  min={0}
                  step={"any"}
                  {...register("itemPrice", {
                    required: "Invalid price"
                  })}
                  />
                  {errors.itemPrice && (<p className="text-red-500">{errors.itemPrice.message}</p>)}
              </div>
              <div className="flex flex-col">
                <label>Image</label>
                <input 
                  type="file" 
                  className="w-96 text-black border-black border-2"
                  {...register("itemImage", {
                    required: "Invalid image",
                    onChange: handleFileUploadChange,
                  })}
                  />
                  {errors.itemImage && (<p className="text-red-500">{errors.itemImage.message}</p>)}
              </div>
              <div>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}>
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

export default RestaurantMenuAdmin
