"use client";

import React, { FormEvent } from 'react'
import { useForm } from 'react-hook-form';

const page = () => {
  type TestData = {
    testData: String
  }

  const { handleSubmit } = useForm<TestData>();

  const handleSubmitButton = async () => {
    console.log("submitting for test");
    const res = await fetch('/api/test');
    console.log(res);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitButton)}>
        <div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default page