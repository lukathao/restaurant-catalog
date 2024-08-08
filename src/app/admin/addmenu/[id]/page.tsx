import React from 'react'

const AddMenuItem = () => {
  return (
    <>
      <div>
        <h1>Add New Menu Item</h1>
      </div>
      <div>
        <form>
          <div id="itemType" className="p-5">
            <label>Item Type</label><br />
            <select className="text-black border-2 border-black">
              <option value="0">Appetizer</option>
              <option value="1">Entree</option>
              <option value="2">Dessert</option>
              <option value="3">Drinks</option>
              <option value="4">A la carte</option>
              <option value="5">Other</option>
            </select>
          </div>
          <div id="itemName" className="p-5">
            <label>Item Name</label><br />
            <input type="text" name="menuItem" className="w-96 text-black border-black border-2" />
          </div>
          <div id="itemDescription" className="p-5">
            <label>Description</label><br />
            <textarea rows="3" name="menuDescription" className="w-96 block text-black border-black border-2" />
          </div>
          <div id="price" className="p-5">
            <label>Price</label><br />
            <input type="text" name="price" className="text-black border-black border-2" />
          </div>
          <div id="submitNewMenuItem" className="p-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMenuItem