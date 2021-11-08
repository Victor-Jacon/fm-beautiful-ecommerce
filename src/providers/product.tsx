import React, { useState } from 'react'

// [Context 1]
export const ProductContext = React.createContext({});

export interface ProductContextType {
   productsList: any;
   setProductsList:(array: any) => void
 }

export const ProductProvider = (props: any) => {
  const [productsList, setProductsList] = useState([
    {
       "id":"70788059",
       "title":"Forest Gump Shoes",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297575-image1.png?fm=jpg"
       },
       "description":"amazing forest gump shoes",
       "rating":2,
       "price":13.48
    },
    {
       "id":"70780958",
       "title":"Charger (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297560-image4.png?fm=jpg"
       },
       "description":"Charge your phone with a passport-charger hibrid. The amazon choice for digital nomads.",
       "rating":4.5,
       "price":16.48
    },
    {
       "id":"70780948",
       "title":"Gift (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297552-image5.png?fm=jpg"
       },
       "description":"Random gift, can be a 200 reais bill, who knows?",
       "rating":4.75,
       "price":17.48
    },
    {
       "id":"70780962",
       "title":"Drink (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297565-image3.png?fm=jpg"
       },
       "description":"Mate, the best for your coding nights",
       "rating":4,
       "price":15.48
    },
    {
       "id":"70780969",
       "title":"Typewriter (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297570-image2.png?fm=jpg"
       },
       "description":"A typewriter will help you write better typescript, 50% off today...",
       "rating":3,
       "price":14.48
    },
    {
       "id":"70780976",
       "title":"Miscellaneous (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297581-image.png?fm=jpg"
       },
       "description":"Amazing unknown misc products",
       "rating":1,
       "price":12.48
    }
  ]);

  return (
    <ProductContext.Provider value={{ productsList, setProductsList }}>
      { props.children }
    </ProductContext.Provider>
  )
}