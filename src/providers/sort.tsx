import React, { useState } from 'react';

// [Context 1]
export const SortContext = React.createContext({});

// [Context 2]
export interface SortContextType {
   sort: any;
   setSort:(array: any) => void
}

// [Context 3]
export const SortProvider = (props: any) => {

  // options: price_DESC, rating_DESC
  const [sort, setSort] = useState('price_DESC');

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      { props.children }
    </SortContext.Provider>
  )
}

/* PRICE AND RATING - FILTERS */
export const FilterContext = React.createContext({});

export interface FilterContextType {
  minPriceFilter: any,
  setMinPriceFilter:(array: any) => void,
  maxPriceFilter: any, 
  setMaxPriceFilter:(array: any) => void,
  minRatingFilter: any,
  setMinRatingFilter:(array: any) => void,
}

export const FilterProvider = (props: any) => {

  // options: price_DESC, rating_DESC
  const [minPriceFilter, setMinPriceFilter] = useState();
  const [maxPriceFilter, setMaxPriceFilter] = useState();
  const [minRatingFilter, setMinRatingFilter] = useState();

  return (
    <FilterContext.Provider value={{ minPriceFilter, setMinPriceFilter, maxPriceFilter, setMaxPriceFilter, minRatingFilter, setMinRatingFilter }}>
      { props.children }
    </FilterContext.Provider>
  )
}